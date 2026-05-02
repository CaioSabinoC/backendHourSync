const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function enviarEmailCertificado({ para, nomeAluno, tituloCertificado, status, justificativa, horasAprovadas }) {
  const aprovado = status === 'APROVADO';

  const assunto = aprovado
    ? `✅ Certificado aprovado — ${tituloCertificado}`
    : `❌ Certificado recusado — ${tituloCertificado}`;

  const corpo = aprovado
    ? `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#6c83e6;padding:24px;border-radius:8px 8px 0 0;">
          <h2 style="color:white;margin:0;">HourSync</h2>
        </div>
        <div style="padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
          <h3 style="color:#22c55e;">✅ Certificado Aprovado!</h3>
          <p>Olá, <strong>${nomeAluno}</strong>!</p>
          <p>Seu certificado <strong>${tituloCertificado}</strong> foi <strong style="color:#22c55e;">aprovado</strong>.</p>
          <p><strong>Horas aprovadas:</strong> ${horasAprovadas}h</p>
          <p>As horas já foram contabilizadas no seu histórico de atividades complementares.</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">
          <p style="color:#6b7280;font-size:0.875rem;">HourSync — Sistema de Atividades Complementares</p>
        </div>
      </div>`
    : `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#6c83e6;padding:24px;border-radius:8px 8px 0 0;">
          <h2 style="color:white;margin:0;">HourSync</h2>
        </div>
        <div style="padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
          <h3 style="color:#ef4444;">❌ Certificado Recusado</h3>
          <p>Olá, <strong>${nomeAluno}</strong>!</p>
          <p>Infelizmente seu certificado <strong>${tituloCertificado}</strong> foi <strong style="color:#ef4444;">recusado</strong>.</p>
          ${justificativa ? `<p><strong>Motivo:</strong> ${justificativa}</p>` : ''}
          <p>Você pode enviar um novo certificado corrigido pelo sistema.</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">
          <p style="color:#6b7280;font-size:0.875rem;">HourSync — Sistema de Atividades Complementares</p>
        </div>
      </div>`;

  try {
    await resend.emails.send({
      from: 'HourSync <onboarding@resend.dev>',
      to: para,
      subject: assunto,
      html: corpo
    });
    console.log(`Email enviado para ${para}`);
  } catch (err) {
    console.error('Erro ao enviar email:', err.message);
  }
}

module.exports = { enviarEmailCertificado };
