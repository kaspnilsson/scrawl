# Email templates

Generated using mailwind: https://github.com/soheilpro/mailwind

## Install

```
npm install -g mailwind
```

## Usage

Design your HTML email using the Tailwind utility classes like you normally would for the web.

Then run the following command to generate the corresponding CSS file:

```
mailwind --input-html email.html --output-css style.css
```

Or run this command to generate an inlined HTML file:

```
mailwind --input-html email.html --output-html email-inlined.html
```

## Options

`--input-css`

The path to your base CSS file. Use this if you need to write custom CSS. Defaults to [style.css](./src/style.css).

`--input-html`

The path to your HTML email file.

`--output-css`

The path to the CSS file that will be generated.

`--output-html`

The path to the inlined HTML file that will be generated.

`--tailwind-config`

The path to your custom Tailwind configuration file. Defaults to [tailwind.config.js](./src/tailwind.config.js).
