const Mailgen = require("mailgen");
const sgMail = require("@sendgrid/mail");

require("dotenv").config();

class EmailService {
    #sender = sgMail;
    #GenerateTemplate = Mailgen;
    constructor() {
        this.link = "http://localhost:3000";
    }
    #createTemplate(verificationToken, name = "Guest") {
        const mailGenerator = new this.#GenerateTemplate({
            theme: "default",
            product: {
                name: "NodeJsGoIt",
                link: this.link,
            },
        });

        const template = {
            body: {
                name,
                intro: "Welcome to NodeJsGoIt! We're very excited to have you on board.",
                action: {
                    instructions: "To get started with NodeJsGoIt, please click here:",
                    button: {
                        color: "#22BC66", // Optional action button color
                        text: "Confirm your account",
                        link: `${this.link}/auth/verify/${verificationToken}`,
                    },
                },
                outro:
                    "Need help, or have questions? Just reply to this email, we'd love to help.",
            },
        };

        return mailGenerator.generate(template);
    }

    async sendEmail(verificationToken, email, name) {
        const emailBody = this.#createTemplate(verificationToken, name);
        this.#sender.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
            to: email,
            from: "nikita545goit@gmail.com",
            subject: "Confirm your account",
            html: emailBody,
        };
        await this.#sender.send(msg);
    }
}

module.exports = new EmailService();
