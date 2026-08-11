# EmailJS Template Setup for Project Inquiry Form

This document contains the exact template structure to use in your EmailJS dashboard for the Project Inquiry modal.

## Template Configuration

### Template Name
`Project Inquiry Template` or `project_inquiry_template`

### Template ID
Use this ID in your `.env` file as `VITE_EMAILJS_TEMPLATE_ID`

---

## Email Template Content

### Subject Line
```
New Project Inquiry from {{name}}
```

### Email Body (HTML or Plain Text)

Copy and paste the following template into your EmailJS template editor:

```
New Project Inquiry

Hello Apex Spider Innovation Team,

You have received a new project inquiry from your website.

---

## CONTACT DETAILS

Name:
{{name}}

Email:
{{email}}

Phone / WhatsApp:
{{phone}}

Company / Organization:
{{company}}

---

## PROJECT DETAILS

Project Type:
{{projectType}}

Budget Range:
{{budget}}

---

## REQUIREMENTS

{{message}}

---

Please respond to the customer at the earliest convenience.

Apex Spider Innovation
```

---

## EmailJS Template Variables

Make sure these variables are configured in your EmailJS template:

| Variable Name | Form Field | Description |
|--------------|------------|-------------|
| `{{name}}` | name | Customer's full name |
| `{{email}}` | email | Customer's email address |
| `{{phone}}` | phone | Customer's phone/WhatsApp number |
| `{{company}}` | company | Customer's company/organization |
| `{{projectType}}` | projectType | Type of project (Web Development, Mobile Development, etc.) |
| `{{budget}}` | budget | Budget range selected |
| `{{message}}` | message | Project details and requirements |

---

## HTML Template (Optional - Enhanced Version)

If you prefer a styled HTML email, use this enhanced version:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
            color: #00ffff;
            font-size: 24px;
            margin-bottom: 10px;
            border-bottom: 3px solid #00ffff;
            padding-bottom: 10px;
        }
        h2 {
            color: #0f172a;
            font-size: 18px;
            margin-top: 25px;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .field {
            margin-bottom: 15px;
            padding: 10px;
            background-color: #f8f9fa;
            border-left: 4px solid #00ffff;
            border-radius: 4px;
        }
        .field-label {
            font-weight: 600;
            color: #555;
            display: block;
            margin-bottom: 5px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .field-value {
            color: #000;
            font-size: 15px;
        }
        .requirements {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 4px;
            border-left: 4px solid #6366f1;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #e0e0e0;
            text-align: center;
            color: #888;
            font-size: 14px;
        }
        .footer strong {
            color: #00ffff;
        }
        .divider {
            height: 1px;
            background-color: #e0e0e0;
            margin: 25px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>New Project Inquiry</h1>
        <p>Hello Apex Spider Innovation Team,</p>
        <p>You have received a new project inquiry from your website.</p>

        <div class="divider"></div>

        <h2>📋 Contact Details</h2>
        
        <div class="field">
            <span class="field-label">Name</span>
            <span class="field-value">{{name}}</span>
        </div>

        <div class="field">
            <span class="field-label">Email</span>
            <span class="field-value">{{email}}</span>
        </div>

        <div class="field">
            <span class="field-label">Phone / WhatsApp</span>
            <span class="field-value">{{phone}}</span>
        </div>

        <div class="field">
            <span class="field-label">Company / Organization</span>
            <span class="field-value">{{company}}</span>
        </div>

        <div class="divider"></div>

        <h2>💼 Project Details</h2>

        <div class="field">
            <span class="field-label">Project Type</span>
            <span class="field-value">{{projectType}}</span>
        </div>

        <div class="field">
            <span class="field-label">Budget Range</span>
            <span class="field-value">{{budget}}</span>
        </div>

        <div class="divider"></div>

        <h2>📝 Requirements</h2>
        <div class="requirements">{{message}}</div>

        <div class="footer">
            <p>Please respond to the customer at the earliest convenience.</p>
            <p><strong>Apex Spider Innovation</strong></p>
        </div>
    </div>
</body>
</html>
```

---

## Setup Instructions

### Step 1: Login to EmailJS Dashboard
1. Go to [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)
2. Login with your account credentials

### Step 2: Create New Template
1. Navigate to **Email Templates** section
2. Click **Create New Template**
3. Give it a name like "Project Inquiry Template"

### Step 3: Configure Template
1. **Subject**: `New Project Inquiry from {{name}}`
2. **Content**: Copy and paste either the plain text or HTML template above
3. **From Name**: `Apex Spider Innovation Website`
4. **From Email**: Use your verified email address
5. **To Email**: Your team's email address (where you want to receive inquiries)

### Step 4: Test Template Variables
Make sure all these variables are recognized by EmailJS:
- `{{name}}`
- `{{email}}`
- `{{phone}}`
- `{{company}}`
- `{{projectType}}`
- `{{budget}}`
- `{{message}}`

### Step 5: Save and Get Template ID
1. Save the template
2. Copy the **Template ID** (e.g., `template_abc123xyz`)
3. Update your `.env` file:
   ```
   VITE_EMAILJS_TEMPLATE_ID=template_abc123xyz
   ```

---

## Current Implementation

The project inquiry modal already sends all required fields to EmailJS:

```javascript
const templateParams = {
  name: formData.name,
  email: formData.email,
  projectType: formData.projectType,
  message: formData.message,
  phone: formData.phone || 'Not provided',
  company: formData.company || 'Not provided',
  budget: formData.budget || 'Not specified',
};
```

All fields match the template variables, so once you create the EmailJS template with the content above, everything will work automatically.

---

## Testing

After setting up the template:

1. Open your website
2. Click "Start Project" button (mobile only)
3. Fill out the form with test data
4. Submit the form
5. Check your email inbox for the formatted inquiry

---

## Troubleshooting

**If emails are not arriving:**
- Verify your EmailJS service ID, template ID, and public key are correct in `.env`
- Check EmailJS dashboard for error logs
- Verify the "To Email" address is correct in the template
- Make sure all template variables match the field names

**If template variables show as blank:**
- Ensure variable names in template exactly match: `{{name}}`, not `{{ name }}` or `{{Name}}`
- Check that `contactService.js` is passing all fields correctly

---

## Support

For EmailJS-specific issues, visit:
- Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- Support: [https://www.emailjs.com/support/](https://www.emailjs.com/support/)
