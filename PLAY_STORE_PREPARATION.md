# SandyTools — Google Play Store Preparation

## App identity

- App name: SandyTools
- Application ID / package name: com.sandytools.app
- Current versionName: 1.0.4
- Current versionCode: 5
- compileSdk: 35
- targetSdk: 35
- minSdk: 23
- App type: Free Android app
- Primary website: https://sandeep0181.github.io/SandyTools/

## Release plan

1. Finish and test the Android app.
2. Create a signed Android App Bundle (.aab).
3. Keep the upload/signing keystore backed up securely.
4. Create the Google Play Console developer account and complete verification.
5. Create the SandyTools app in Play Console.
6. Prepare store listing, screenshots, icon and feature graphic.
7. Complete Privacy Policy and Data Safety declarations based on the final app behavior.
8. Run the required testing track for the developer account.
9. Apply for production access if Play Console requires it.
10. Upload the signed AAB to Production and submit for review.

## Store listing draft

### Short description
Free calculators, creator tools, image, QR, PDF and useful everyday utilities.

### Full description
SandyTools brings useful everyday tools into one simple Android app.

Features include:
- Percentage, age, EMI, GST, SIP and discount calculators
- YouTube title and description helpers
- Hashtag, word and character tools
- Date, time and unit utilities
- Password generator
- Image compressor and resizer
- QR code generator
- PDF merge, split and conversion tools
- JSON formatter
- AI-ready prompt and content tools

SandyTools is designed for quick, simple use on mobile devices.

For important financial, business or official decisions, verify calculator results with the relevant official or professional source.

### Category
Utilities

## Assets still required

- 512x512 Play Store app icon
- Feature graphic
- Phone screenshots
- Optional tablet screenshots
- Final app icon inside the Android project
- Final signed AAB

## Policy and compliance checklist

- Privacy Policy URL: https://sandeep0181.github.io/SandyTools/privacy.html
- Terms URL: https://sandeep0181.github.io/SandyTools/terms.html
- Contact page: https://sandeep0181.github.io/SandyTools/contact.html
- Data Safety form: complete only after confirming the final Android app behavior.
- Ads declaration: complete according to the final release configuration.
- Content rating questionnaire: complete in Play Console.
- Target audience declaration: complete in Play Console.
- App access declaration: complete if any restricted/login-only area is added.
- Permissions: review AndroidManifest before release and remove permissions that are not needed.

## Signing

Do NOT commit the release keystore, passwords or signing credentials to GitHub.

Before the first production upload:
- Generate a release/upload keystore.
- Store an encrypted backup outside the repository.
- Configure signing securely.
- Record the package name and versionCode.
- Keep the upload key backup safe.

## Versioning

Current:
- versionName = 1.0.4
- versionCode = 5

Every Play Store update must increase versionCode.

## Final QA before submission

- App installs on a real Android phone.
- App opens without crashing.
- All important buttons work.
- APK/AAB release build works.
- Back navigation works.
- External links work.
- File/image/PDF tools work as intended.
- No debug/test text remains.
- No test API keys or secrets are included.
- Privacy Policy matches actual app behavior.
- Data Safety answers match actual data collection/sharing.
- Screenshots match the submitted version.
- App icon and branding are consistent.
- A signed AAB is ready.

## Important

The Play Store submission should use the final signed AAB, not the debug APK currently used for website downloads.
