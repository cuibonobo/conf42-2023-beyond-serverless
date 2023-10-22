# conf42-2023-beyond-serverless
Slides for Conf42 Javascript 2023 presentation: "Beyond Serverless: Taking advantage of new standards for Javascript runtimes"

## How I Built This
Create a new repository on GitHub with a README, LICENSE, and Node .gitignore. Then:
```powershell
# Clone the new repository to my local environment and cd into it
git clone git@github.com:cuibonobo/conf42-2023-beyond-serverless.git
cd ./conf42-2023-beyond-serverless

# Create a basic package.json file
npm init

# Install Cloudflare Workers dev tools
npm install --save-dev wrangler
```

Create a base `wrangler.toml` file at the root of the repo:
```toml
name = "conf42-2023-beyond-serverless"
main = "src/index.js"
compatibility_date = "2023-10-16"
```

Create a `src` directory at the root of the repo and add an `index.js` file with the following contents:
```javascript
export default {
	async fetch(request, env, ctx) {
		return new Response('Hello World!');
	},
};
```

Add Wrangler scripts to the `"scripts"` key in `package.json`:
```json
{
    "deploy": "wrangler deploy",
    "dev": "wrangler dev",
    "start": "wrangler dev"
}
```

Run the development server with:
```powershell
npm run dev
```

---

Add the `index.html` file from the [Reveal.js](https://revealjs.com) repo to the root of this repository. Then update `src/index.js` to this:
```javascript
import slides from "../index.html";

export default {
	async fetch(request, env, ctx) {
		return new Response(slides, {
      headers: {"content-type": "text/html;charset=UTF-8"}
    });
	},
};
```

Running the dev server again should show the base presentation HTML.
