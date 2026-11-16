import { Code } from "@/registry/bases/takumi/components/code/code";
import { PdfcnThemeProvider } from "@/registry/bases/takumi/components/theme-provider";
import { Document, Page } from "@/registry/bases/takumi/lib/pdf-primitives";

const DemoBody = () => (
  <>
    <Code
      code={"npx shadcn@latest add @pdfcn/takumi/code"}
      language="shell"
      title="Install"
    />
    <Code
      code={'const greeting = "Hello, pdfcn";\nconsole.log(greeting);'}
      title="hello.ts"
    />
    <Code
      accentColor="primary"
      code={
        "function fib(n: number): number {\n  if (n < 2) return n;\n  return fib(n - 1) + fib(n - 2);\n}\n\nfor (let i = 0; i < 10; i++) {\n  console.log(fib(i));\n}"
      }
      maxLines={5}
      title="fib.ts (truncated)"
    />
  </>
);

const Demo = () => (
  <Document>
    <Page size="A4">
      <PdfcnThemeProvider>
        <DemoBody />
      </PdfcnThemeProvider>
    </Page>
  </Document>
);

export default Demo;
