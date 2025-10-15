import { CodeEditor, CodeBlock } from "@/components/ui/code-editor";

export default function TestMonacoPage() {
  const sampleCode = `import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const ExampleComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Counter Example</h2>
      <p className="mb-4">Current count: {count}</p>
      <Button 
        onClick={() => setCount(count + 1)}
        className="mr-2"
      >
        Increment
      </Button>
      <Button 
        onClick={() => setCount(0)}
        variant="outline"
      >
        Reset
      </Button>
    </div>
  );
};

export default ExampleComponent;`;

  const simpleCode = `const greeting = "Hello, World!";
console.log(greeting);`;

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">Monaco Editor Test</h1>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">CodeEditor Component</h2>
        <CodeEditor
          code={sampleCode}
          language="typescript"
          filename="ExampleComponent.tsx"
          title="React Counter Component"
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">CodeBlock Component</h2>
        <CodeBlock
          code={simpleCode}
          language="javascript"
        />
      </div>
    </div>
  );
}
