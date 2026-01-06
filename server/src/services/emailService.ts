import nodemailer from "nodemailer";

interface IEmailOptions {
    to: string;
    subject: string;
    html: string;
}

export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: false, // true para 465, false para outras portas
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    async sendEmail({ to, subject, html }: IEmailOptions): Promise<void> {
        try {
            await this.transporter.sendMail({
                from: process.env.SMTP_FROM || process.env.SMTP_USER,
                to,
                subject,
                html,
            });
        } catch (error) {
            console.error("Erro ao enviar e-mail:", error);
            throw new Error("Erro ao enviar e-mail. Tente novamente mais tarde.");
        }
    }

    async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
        const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/resetar-senha?token=${resetToken}`;
        
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .header {
                        background-color: #007bff;
                        color: white;
                        padding: 20px;
                        text-align: center;
                        border-radius: 5px 5px 0 0;
                    }
                    .content {
                        background-color: #f9f9f9;
                        padding: 30px;
                        border-radius: 0 0 5px 5px;
                    }
                    .button {
                        display: inline-block;
                        padding: 12px 30px;
                        background-color: #007bff;
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                        margin: 20px 0;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 20px;
                        color: #666;
                        font-size: 12px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Recuperação de Senha</h1>
                    </div>
                    <div class="content">
                        <p>Olá,</p>
                        <p>Você solicitou a recuperação de senha para sua conta.</p>
                        <p>Clique no botão abaixo para redefinir sua senha:</p>
                        <div style="text-align: center;">
                            <a href="${resetUrl}" class="button">Redefinir Senha</a>
                        </div>
                        <p>Ou copie e cole o link abaixo no seu navegador:</p>
                        <p style="word-break: break-all; color: #007bff;">${resetUrl}</p>
                        <p><strong>Este link expira em 1 hora.</strong></p>
                        <p>Se você não solicitou esta recuperação de senha, ignore este e-mail.</p>
                    </div>
                    <div class="footer">
                        <p>Este é um e-mail automático, por favor não responda.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        await this.sendEmail({
            to: email,
            subject: "Recuperação de Senha - LRM",
            html,
        });
    }
}

