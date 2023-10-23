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

To be able to run custom reveal.js plugins, we need to be able to serve static assets from our worker. Create a `static` folder at the root of the repo and add the reveal.js plugin folders.

Create a new Cloudflare R2 bucket for the static assets:
```powershell
npx wrangler r2 bucket create conf42-2023-static-assets
```

Add the following section to `wrangler.toml` to bind the bucket to the worker:
```toml
[[r2_buckets]]
binding = "STATIC_ASSETS"
bucket_name = "conf42-2023-static-assets"
```

Install a package for walking directory trees:
```powershell
npm install --save-dev diveSync
```

Add the `sync.js` script along with its `package.json` scripts:
```json
{
    "sync": "node ./sync.js",
    "sync:remote": "node ./sync.js --remote"
}
```

Run `npm run sync` and `npm run sync:remote` to sync the static files to your local and remote R2 stores. Then, update `src/index.js` to [retrieve objects from R2 for `GET` requests](https://developers.cloudflare.com/r2/api/workers/workers-api-usage/#4-access-your-r2-bucket-from-your-worker).

Finally, update `index.html` with the changes needed for the new reveal.js plugins.
