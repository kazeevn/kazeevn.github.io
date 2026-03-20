"use client";

import {
  MathJax,
  MathJaxContext,
  type MathJax4Config,
} from "better-react-mathjax";

const mathJaxConfig: MathJax4Config = {
  loader: { load: ["[tex]/cancel"] },
  tex: {
    packages: { "[+]": ["cancel"] },
  },
};

const standardModelLagrangian = String.raw`\[
\begin{aligned}
\mathcal{L}_{\mathrm{SM}} ={}&
-\frac{1}{4} F_{\mu\nu} F^{\mu\nu}
+ i\bar{\psi} \cancel{D} \psi 
+ \psi_i y_{ij} \psi_j \phi + \text{h.c.}
+ \lvert D_\mu \phi \rvert^2 - V(\phi)
\end{aligned}
\]`;

export default function StandardModelEquation() {
  return (
    <MathJaxContext version={4} config={mathJaxConfig} hideUntilTypeset="first">
      <div className="overflow-x-auto">
        <MathJax>
          {standardModelLagrangian}
        </MathJax>
      </div>
    </MathJaxContext>
  );
}
