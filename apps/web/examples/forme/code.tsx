import { Document, Page, View } from "@formepdf/react";

import { Code } from "@/registry/bases/forme/components/code/code";

const Demo = () => (
  <Document>
    <Page margin={40} size="A4">
      <View>
        <Code
          code={"npx shadcn@latest add @pdfcn/forme/code"}
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
      </View>
    </Page>
  </Document>
);

export default Demo;
