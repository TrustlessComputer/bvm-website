import React, { useState } from 'react';
import './customBlocks/custom_Blocks';
import { BlocklyWorkspace } from 'react-blockly';
import { Box } from '@chakra-ui/react';
import s from './styles.module.scss';
import { javascriptGenerator } from 'blockly/javascript';

const toolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Logic',
      contents: [
        { kind: 'block', type: 'controls_if' },
        { kind: 'block', type: 'logic_compare' },
      ],
    },
    {
      kind: 'category',
      name: 'Math',
      contents: [
        { kind: 'block', type: 'math_number' },
        { kind: 'block', type: 'math_arithmetic' },
      ],
    },
    { kind: 'category', name: 'Text', contents: [{ kind: 'block', type: 'text' }] },
  ],
};

const ReactBlocklyComponent = () => {
  const [xml, setXml] = useState("");
  const [javascriptCode, setJavascriptCode] = useState("");

  const initialXml =
    '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="text" x="70" y="30"><field name="TEXT"></field></block></xml>';
  const toolboxCategories = {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "Logic",
        colour: "#5C81A6",
        contents: [
          {
            kind: "block",
            type: "controls_if",
          },
          {
            kind: "block",
            type: "logic_compare",
          },
        ],
      },
      {
        kind: "category",
        name: "Math",
        colour: "#5CA65C",
        contents: [
          {
            kind: "block",
            type: "math_round",
          },
          {
            kind: "block",
            type: "math_number",
          },
        ],
      },
      {
        kind: "category",
        name: "Custom",
        colour: "#5CA699",
        contents: [
          {
            kind: "block",
            type: "new_boundary_function",
          },
          {
            kind: "block",
            type: "return",
          },
        ],
      },
    ],
  };

  function workspaceDidChange(workspace: any) {
    const code = javascriptGenerator.workspaceToCode(workspace);
    // const code = Blockly.JavaScript.workspaceToCode(workspace);
    setJavascriptCode(code);
  }

  return (
    <Box className={s.container}>
      <BlocklyWorkspace
        toolboxConfiguration={toolboxCategories}
        initialXml={initialXml}
        className="fill-height"
        workspaceConfiguration={{
          grid: {
            spacing: 20,
            length: 3,
            colour: "#ccc",
            snap: true,
          },
        }}
        onWorkspaceChange={workspaceDidChange}
        onXmlChange={setXml}
      />
      <textarea
        id="code"
        style={{ height: "200px", width: "400px", background: '#FFF', color: '#000' }}
        value={javascriptCode}
        readOnly
      ></textarea>
    </Box>

  )
};

export default ReactBlocklyComponent;
