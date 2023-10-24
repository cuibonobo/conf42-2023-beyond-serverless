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
    "start": "npm run dev"
}
```

Run the development server with:
```powershell
npm run dev
```

---

Wrangler will bundle files automatically! Add the `index.html` file from the [reveal.js repo](https://github.com/hakimel/reveal.js) repo to the root of this repository. Then update `src/index.js` to this:
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

Running the dev server again should show the bare presentation HTML (without functionality or styles).

To get the slides to actually work, change all of the asset URLs in `index.html` to point to their minimized counterparts on [CDN.js](https://cdnjs.com/libraries/reveal.js/4.6.1).

---

To be able to run custom reveal.js plugins, we need to be able to serve static assets from our worker. Create a `public` folder at the root of the repo and add the reveal.js plugin folders.

Update the `package.json` scripts to include the new folder:
```json
{
    "deploy": "wrangler deploy --assets public/",
    "dev": "wrangler dev --assets public/"
}
```

Finally, update `index.html` to add the new reveal.js plugin scripts and add any necessary configuration.
