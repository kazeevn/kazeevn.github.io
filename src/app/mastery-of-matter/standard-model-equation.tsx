"use client";

import {
  MathJax,
  MathJaxContext,
  type MathJax4Config,
} from "better-react-mathjax";

const mathJaxSrc = "https://cdn.jsdelivr.net/npm/mathjax@4.1.1/tex-mml-chtml.js";

const mathJaxConfig: MathJax4Config = {
  loader: { load: ["[tex]/cancel"] },
  tex: {
    packages: { "[+]": ["cancel"] },
  },
};

const standardModelLagrangian = String.raw`\[
\mathcal{L}_{\mathrm{SM}} =
-\frac{1}{4} F_{\mu\nu} F^{\mu\nu}
+ i\bar{\psi} \cancel{D} \psi 
+ \psi_i y_{ij} \psi_j \phi + \text{h.c.}
+ \lvert D_\mu \phi \rvert^2 - V(\phi)
\]`;

const compactStandardModelLagrangian = String.raw`\[
\begin{aligned}
\mathcal{L}_{\mathrm{SM}} ={}&
-\frac{1}{4} F_{\mu\nu} F^{\mu\nu}
+ i\bar{\psi} \cancel{D} \psi \\
&+ \psi_i y_{ij} \psi_j \phi + \text{h.c.} \\
&+ \lvert D_\mu \phi \rvert^2 - V(\phi)
\end{aligned}
\]`;

export default function StandardModelEquation() {
  return (
    <MathJaxContext
      version={4}
      src={mathJaxSrc}
      config={mathJaxConfig}
      hideUntilTypeset="first"
    >
      <div className="overflow-x-auto">
        <div className="min-[35rem]:hidden">
          <MathJax>
            {compactStandardModelLagrangian}
          </MathJax>
        </div>
        <div className="hidden min-[35rem]:block">
          <MathJax>
            {standardModelLagrangian}
          </MathJax>
        </div>
      </div>
    </MathJaxContext>
  );
}
