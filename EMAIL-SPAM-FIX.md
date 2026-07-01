# Email Deliverability & DNS Configuration Guide

## Why Emails Go to Spam

When emails land in spam, it's usually because email providers (Gmail, Outlook, etc.) can't verify the sender is legitimate. They check **three things**:

1. **Who claimed to send it** (From address)
2. **Who actually sent it** (Server IP)
3. **Can this be verified** (DNS records)

Without proper DNS records, your emails look suspicious even if content is legitimate.

---

## DNS Records You Need

### 1. SPF (Sender Policy Framework)

**What it does:** Tells email providers which servers are allowed to send email for your domain.

**Add this TXT record at Hostinger:**

```
Name:    @
Type:    TXT
Value:   v=spf1 include:_spf.hostinger.com ~all
```

**How it works:**
- `v=spf1` - This is an SPF record
- `include:_spf.hostinger.com` - Hostinger's servers are authorized senders
- `~all` - Soft fail (emails from other servers go to spam, not hard reject)

---

### 2. DKIM (DomainKeys Identified Mail)

**What it does:** Adds a cryptographic signature proving your emails weren't tampered with and really came from your domain.

**How to get it:**
1. Log into Hostinger hPanel
2. Go to **Email** → **Email Accounts** or **Advanced Features**
3. Look for **DKIM** or **Email Authentication**
4. Copy the DKIM record they provide
5. Add it as a **TXT** record

The record looks something like:
```
Name:    google._domainkey
Type:    TXT
Value:   v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBA...
```

---

### 3. DMARC (Domain-based Message Authentication, Reporting & Conformance)

**What it does:** Tells receiving servers what to do when SPF/DKIM fails ( quarantine, reject, or just monitor).

**Add this TXT record:**

```
Name:    _dmarc
Type:    TXT
Value:   v=DMARC1; p=quarantine; rua=mailto:dmarc@vistaestate.shop; pct=100
```

**Options:**
- `p=none` - Monitor only, no action
- `p=quarantine` - Send failures to spam (recommended to start)
- `p=reject` - Hard reject failures (use after testing)

- `rua=mailto:...` - Get daily reports about auth failures

---

## How to Add DNS Records in Hostinger

1. Log into **hPanel**
2. Go to **Domains** → Click your domain
3. Find **DNS Zone** or **DNS Records**
4. Add each record:

| Type | Name | Value |
|------|------|-------|
| TXT | @ | `v=spf1 include:_spf.hostinger.com ~all` |
| TXT | `_dmarc` | `v=DMARC1; p=quarantine; rua=mailto:dmarc@vistaestate.shop; pct=100` |
| TXT | `dkim` or as provided | (copy from Hostinger) |

5. **Wait 24-48 hours** for DNS to propagate globally

---

## Verify Your DNS Setup

### Check SPF:
```bash
dig TXT vistaestate.shop +short
```

### Check DKIM:
```bash
dig TXT hostingermail1._domainkey.vistaestate.shop +short
```

### Check DMARC:
```bash
dig TXT _dmarc.vistaestate.shop +short
```

### Online tools:
- https://mxtoolbox.com/ - Enter your domain, check all records
- https://toolbox.googleapps.com/apps/checkmx/ - Google's diagnostic tool

---

## Additional Tips to Avoid Spam

### Email Content

| Trigger | Fix |
|---------|-----|
| Too many external links | Keep under 5 links per email |
| External image hosts (like ibb.co) | Host images on your own domain |
| "Click here" repeated | Use descriptive anchor text |
| ALL CAPS subject | Use normal sentence case |
| Too many exclamation points!!! | Maximum 1-2 |
| "Act now!", "Limited time" | Remove urgency language |

### Technical Fixes

1. **Host images on your domain** - Instead of `https://i.ibb.co/...`, upload to `https://vistaestate.shop/images/`

2. **Warm up your domain** - First week: send 50 emails/day max, then gradually increase

3. **Monitor bounce rates** - Above 5% hurts reputation

---

## Why Your Emails Were Going to Spam

1. **No SPF/DKIM/DMARC** - Receiving servers couldn't verify you owned the domain
2. **`Precedence: list`** - Flagged as bulk mail
3. **`Auto-Submitted: auto-generated`** - Explicit bulk mail marker
4. **External images** - ibb.co images = tracking pixel red flag
5. **Mismatched Reply-To** - Could look like address spoofing

---

## Expected Results After DNS Setup

| Timeline | What Happens |
|----------|--------------|
| 0-24 hours | DNS propagates, some providers update |
| 1-3 days | Most providers recognize your domain |
| 1-2 weeks | Full reputation builds, emails land in inbox |

---

## Need Help?

- **Hostinger Support**: Enable DKIM in your control panel
- **MXToolbox**: https://mxtoolbox.com/NetworkTools.aspx - Diagnose all records
- **Google Postmaster**: https://postmaster.google.com - Monitor Gmail delivery (free)