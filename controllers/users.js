const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { PAGE_URL } = require('../config');


usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
        return response.status(400).json({ error: 'Todos los espacios son requeridos' });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
        return response.status(400).json({ error: 'Este correo ya ha sido utilizado' });
    }
    const saltRounds = 10;

    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
        name,
        email,
        passwordHash,
    });

    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',
    });
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: savedUser.email,
        subject: 'Verificacion de usuario',
        html: `<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

        <head>
            <title>
        
            </title>
            <!--[if !mso]><!-- -->
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <!--<![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style type="text/css">
                #outlook a {
                    padding: 0;
                }
        
                .ReadMsgBody {
                    width: 100%;
                }
        
                .ExternalClass {
                    width: 100%;
                }
        
                .ExternalClass * {
                    line-height: 100%;
                }
        
                body {
                    margin: 0;
                    padding: 0;
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                }
        
                table,
                td {
                    border-collapse: collapse;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                }
        
                img {
                    border: 0;
                    height: auto;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                    -ms-interpolation-mode: bicubic;
                }
        
                p {
                    display: block;
                    margin: 13px 0;
                }
            </style>
            <!--[if !mso]><!-->
            <style type="text/css">
                @media only screen and (max-width:480px) {
                    @-ms-viewport {
                        width: 320px;
                    }
                    @viewport {
                        width: 320px;
                    }
                }
            </style>
            <!--<![endif]-->
            <!--[if mso]>
                <xml>
                <o:OfficeDocumentSettings>
                  <o:AllowPNG/>
                  <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
                </xml>
                <![endif]-->
            <!--[if lte mso 11]>
                <style type="text/css">
                  .outlook-group-fix { width:100% !important; }
                </style>
                <![endif]-->
        
        
            <style type="text/css">
                @media only screen and (min-width:480px) {
                    .mj-column-per-100 {
                        width: 100% !important;
                    }
                }
            </style>
        
        
            <style type="text/css">
            </style>
        
        </head>
        
        <body style="background-color:#f9f9f9;">
        
        
            <div style="background-color:#f9f9f9;">
        
        
                <!--[if mso | IE]>
              <table
                 align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
              >
                <tr>
                  <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
        
        
                <div style="background:#f9f9f9;background-color:#f9f9f9;Margin:0px auto;max-width:600px;">
        
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f9f9f9;background-color:#f9f9f9;width:100%;">
                        <tbody>
                            <tr>
                                <td style="border-bottom:#333957 solid 5px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                                    <!--[if mso | IE]>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        
                <tr>
              
                </tr>
              
                          </table>
                        <![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
        
                </div>
        
        
                <!--[if mso | IE]>
                  </td>
                </tr>
              </table>
              
              <table
                 align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
              >
                <tr>
                  <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
        
        
                <div style="background:#fff;background-color:#fff;Margin:0px auto;max-width:600px;">
        
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fff;background-color:#fff;width:100%;">
                        <tbody>
                            <tr>
                                <td style="border:#dddddd solid 1px;border-top:0px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                                    <!--[if mso | IE]>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        
                <tr>
              
                    <td
                       style="vertical-align:bottom;width:600px;"
                    >
                  <![endif]-->
        
                                    <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100%;">
        
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:bottom;" width="100%">
        
                                            <tr>
                                                <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
        
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                        <tbody>
                                                            <tr>
                                                                <td style="width:64px;">
        
                                                                    <img height="auto" src="https://cdn3.emoji.gg/emojis/9578-thumbs-up-cat.png" style="border:0;display:block;outline:none;text-decoration:none;width:100%;" width="64" />
        
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
        
                                                </td>
                                            </tr>
        
                                            <tr>
                                                <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:40px;word-break:break-word;">
        
                                                    <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:28px;font-weight:bold;line-height:1;text-align:center;color:#555;">
                                                        Código de verificación
                                                    </div>
        
                                                </td>
                                            </tr>
        
                                            <tr>
                                                <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
        
                                                    <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:22px;text-align:left;color:#555;">
                                                        Hola ${savedUser.name}!<br></br>
                                                        Muchas gracias por registrarte. Nos complace tenerte por acá. Por favor da click en el botón para verificarte:
                                                    </div>
        
                                                </td>
                                            </tr>
        
                                            <tr>
                                                <td align="center" style="font-size:0px;padding:10px 25px;padding-top:30px;padding-bottom:50px;word-break:break-word;">
        
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                                        <tr>
                                                            <td align="center" bgcolor="#2F67F6" role="presentation" style="border:none;border-radius:3px;color:#ffffff;cursor:auto;padding:15px 25px;" valign="middle">
                                                                <a href = "${PAGE_URL}/verify/${savedUser.id}/${token}" style="background:#2F67F6;color:#ffffff;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;font-weight:normal;line-height:120%;Margin:0;text-decoration:none;text-transform:none;">
                                                                    Verificar ahora
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </table>
        
                                                </td>
                                            </tr>
        
                                            <tr>
                                                <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
        
                                                    <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:20px;text-align:left;color:#525252;">
                                                        Salu2<br><br> Gabriel Castro <br>Castro's Company, CEO and Founder<br>
                                                        <a href="https://github.com/GabrielCastroV" style="color:#2F67F6">CastroCompany.com</a>
                                                    </div>
        
                                                </td>
                                            </tr>
        
                                        </table>
        
                                    </div>
        
                                    <!--[if mso | IE]>
                    </td>
                  
                </tr>
              
                          </table>
                        <![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
        
                </div>
        
        
                <!--[if mso | IE]>
                  </td>
                </tr>
              </table>
              
              <table
                 align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
              >
                <tr>
                  <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->
        
        
                <div style="Margin:0px auto;max-width:600px;">
        
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                        <tbody>
                            <tr>
                                <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                                    <!--[if mso | IE]>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        
                <tr>
              
                    <td
                       style="vertical-align:bottom;width:600px;"
                    >
                  <![endif]-->
        
                                    <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100%;">
        
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td style="vertical-align:bottom;padding:0;">
        
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
        
                                                            <tr>
                                                                <td align="center" style="font-size:0px;padding:0;word-break:break-word;">
        
                                                                    <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:300;line-height:1;text-align:center;color:#575757;">
                                                                        Castro's Company, TimeSquares. Street 12th, Castro Building. USA
                                                                    </div>
        
                                                                </td>
                                                            </tr>
        
                                                            <tr>
                                                                <td align="center" style="font-size:0px;padding:10px;word-break:break-word;">
        
                                                                    <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:300;line-height:1;text-align:center;color:#575757;">
                                                                        <a href="" style="color:#575757">Unsubscribe</a> from our emails
                                                                    </div>
        
                                                                </td>
                                                            </tr>
        
                                                        </table>
        
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
        
                                    </div>
        
                                    <!--[if mso | IE]>
                    </td>
                  
                </tr>
              
                          </table>
                        <![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
        
                </div>
        
        
                <!--[if mso | IE]>
                  </td>
                </tr>
              </table>
              <![endif]-->
        
        
            </div>
        
        </body>
        
        </html>`,
        // html: `<a href="${PAGE_URL}/verify/${savedUser.id}/${token}">Click here to verify account.</a>`,
    });
    return response.status(201).json('Usuario creado. Por favor, verifica tu correo electrónico.');
});
usersRouter.patch('/:id/:token', async (request, response) => {
    try {
        const token = request.params.token;
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const id = decodedToken.id;
        await User.findByIdAndUpdate(id, { verified: true });
        return response.sendStatus(200);
    } catch (error) {
        const id = request.params.id;
        const { email } = await User.findById(id);
        const token = jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1d',
        });
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verificacion de usuario',
            html: `<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

            <head>
                <title>
            
                </title>
                <!--[if !mso]><!-- -->
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <!--<![endif]-->
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style type="text/css">
                    #outlook a {
                        padding: 0;
                    }
            
                    .ReadMsgBody {
                        width: 100%;
                    }
            
                    .ExternalClass {
                        width: 100%;
                    }
            
                    .ExternalClass * {
                        line-height: 100%;
                    }
            
                    body {
                        margin: 0;
                        padding: 0;
                        -webkit-text-size-adjust: 100%;
                        -ms-text-size-adjust: 100%;
                    }
            
                    table,
                    td {
                        border-collapse: collapse;
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                    }
            
                    img {
                        border: 0;
                        height: auto;
                        line-height: 100%;
                        outline: none;
                        text-decoration: none;
                        -ms-interpolation-mode: bicubic;
                    }
            
                    p {
                        display: block;
                        margin: 13px 0;
                    }
                </style>
                <!--[if !mso]><!-->
                <style type="text/css">
                    @media only screen and (max-width:480px) {
                        @-ms-viewport {
                            width: 320px;
                        }
                        @viewport {
                            width: 320px;
                        }
                    }
                </style>
                <!--<![endif]-->
                <!--[if mso]>
                    <xml>
                    <o:OfficeDocumentSettings>
                      <o:AllowPNG/>
                      <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                    </xml>
                    <![endif]-->
                <!--[if lte mso 11]>
                    <style type="text/css">
                      .outlook-group-fix { width:100% !important; }
                    </style>
                    <![endif]-->
            
            
                <style type="text/css">
                    @media only screen and (min-width:480px) {
                        .mj-column-per-100 {
                            width: 100% !important;
                        }
                    }
                </style>
            
            
                <style type="text/css">
                </style>
            
            </head>
            
            <body style="background-color:#f9f9f9;">
            
            
                <div style="background-color:#f9f9f9;">
            
            
                    <!--[if mso | IE]>
                  <table
                     align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
                  >
                    <tr>
                      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                  <![endif]-->
            
            
                    <div style="background:#f9f9f9;background-color:#f9f9f9;Margin:0px auto;max-width:600px;">
            
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f9f9f9;background-color:#f9f9f9;width:100%;">
                            <tbody>
                                <tr>
                                    <td style="border-bottom:#333957 solid 5px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                                        <!--[if mso | IE]>
                              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                  
                    </tr>
                  
                              </table>
                            <![endif]-->
                                    </td>
                                </tr>
                            </tbody>
                        </table>
            
                    </div>
            
            
                    <!--[if mso | IE]>
                      </td>
                    </tr>
                  </table>
                  
                  <table
                     align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
                  >
                    <tr>
                      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                  <![endif]-->
            
            
                    <div style="background:#fff;background-color:#fff;Margin:0px auto;max-width:600px;">
            
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fff;background-color:#fff;width:100%;">
                            <tbody>
                                <tr>
                                    <td style="border:#dddddd solid 1px;border-top:0px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                                        <!--[if mso | IE]>
                              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                  
                        <td
                           style="vertical-align:bottom;width:600px;"
                        >
                      <![endif]-->
            
                                        <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100%;">
            
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:bottom;" width="100%">
            
                                                <tr>
                                                    <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
            
                                                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="width:64px;">
            
                                                                        <img height="auto" src="https://cdn3.emoji.gg/emojis/9578-thumbs-up-cat.png" style="border:0;display:block;outline:none;text-decoration:none;width:100%;" width="64" />
            
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
            
                                                    </td>
                                                </tr>
            
                                                <tr>
                                                    <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:40px;word-break:break-word;">
            
                                                        <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:28px;font-weight:bold;line-height:1;text-align:center;color:#555;">
                                                            Código de verificación
                                                        </div>
            
                                                    </td>
                                                </tr>
            
                                                <tr>
                                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
            
                                                        <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:22px;text-align:left;color:#555;">
                                                            Hola de nuevo!<br></br>
                                                            Parece que el token anterior ha caducado, pero no te preocupes. Por favor da click en el botón para verificarte te una vez por todas:
                                                        </div>
            
                                                    </td>
                                                </tr>
            
                                                <tr>
                                                    <td align="center" style="font-size:0px;padding:10px 25px;padding-top:30px;padding-bottom:50px;word-break:break-word;">
            
                                                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                                            <tr>
                                                                <td align="center" bgcolor="#2F67F6" role="presentation" style="border:none;border-radius:3px;color:#ffffff;cursor:auto;padding:15px 25px;" valign="middle">
                                                                    <a href = "${PAGE_URL}/verify/${id}/${token}" style="background:#2F67F6;color:#ffffff;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;font-weight:normal;line-height:120%;Margin:0;text-decoration:none;text-transform:none;">
                                                                        Verificar ahora
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        </table>
            
                                                    </td>
                                                </tr>
            
                                                <tr>
                                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
            
                                                        <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:20px;text-align:left;color:#525252;">
                                                            Salu2<br><br> Gabriel Castro <br>Castro's Company, CEO and Founder<br>
                                                            <a href="https://github.com/GabrielCastroV" style="color:#2F67F6">CastroCompany.com</a>
                                                        </div>
            
                                                    </td>
                                                </tr>
            
                                            </table>
            
                                        </div>
            
                                        <!--[if mso | IE]>
                        </td>
                      
                    </tr>
                  
                              </table>
                            <![endif]-->
                                    </td>
                                </tr>
                            </tbody>
                        </table>
            
                    </div>
            
            
                    <!--[if mso | IE]>
                      </td>
                    </tr>
                  </table>
                  
                  <table
                     align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
                  >
                    <tr>
                      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                  <![endif]-->
            
            
                    <div style="Margin:0px auto;max-width:600px;">
            
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                            <tbody>
                                <tr>
                                    <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                                        <!--[if mso | IE]>
                              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                  
                        <td
                           style="vertical-align:bottom;width:600px;"
                        >
                      <![endif]-->
            
                                        <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100%;">
            
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td style="vertical-align:bottom;padding:0;">
            
                                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
            
                                                                <tr>
                                                                    <td align="center" style="font-size:0px;padding:0;word-break:break-word;">
            
                                                                        <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:300;line-height:1;text-align:center;color:#575757;">
                                                                            Castro's Company, TimeSquares. Street 12th, Castro Building. USA
                                                                        </div>
            
                                                                    </td>
                                                                </tr>
            
                                                                <tr>
                                                                    <td align="center" style="font-size:0px;padding:10px;word-break:break-word;">
            
                                                                        <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:300;line-height:1;text-align:center;color:#575757;">
                                                                            <a href="" style="color:#575757">Unsubscribe</a> from our emails
                                                                        </div>
            
                                                                    </td>
                                                                </tr>
            
                                                            </table>
            
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
            
                                        </div>
            
                                        <!--[if mso | IE]>
                        </td>
                      
                    </tr>
                  
                              </table>
                            <![endif]-->
                                    </td>
                                </tr>
                            </tbody>
                        </table>
            
                    </div>
            
            
                    <!--[if mso | IE]>
                      </td>
                    </tr>
                  </table>
                  <![endif]-->
            
            
                </div>
            
            </body>
            
            </html>`,
        });

        return response.status(400).json({ error: 'El link ya expiró. Se ha enviado un nuevo link de verificacion. Revisa tu correo de nuevo' });
    }

});

module.exports = usersRouter;