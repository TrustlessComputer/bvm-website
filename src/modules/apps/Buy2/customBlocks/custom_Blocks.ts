import * as Blockly from 'blockly/core';// import 'blockly/javascript';
import { javascriptGenerator, Order } from 'blockly/javascript';

Blockly.Blocks['new_boundary_function'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput("Boundary Function Name"), "Name");
    this.appendStatementInput("Content")
      .setCheck(null);
    this.setInputsInline(true);
    this.setColour(315);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

javascriptGenerator.forBlock['new_boundary_function'] = function (block) {
  var text_name = block.getFieldValue('Name');
  var statements_content = javascriptGenerator.statementToCode(block, 'Content');
  // TODO: Assemble Python into code variable.
  var code = 'def ' + text_name + '(_object,**kwargs):\n' + statements_content + '\n';
  return code;
};

Blockly.Blocks['return'] = {
  init: function () {
    this.appendValueInput("NAME")
      .setCheck(null)
      .appendField("return");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setColour(330);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

javascriptGenerator.forBlock['return'] = function (block) {
  var value_name = javascriptGenerator.valueToCode(block, 'NAME', Order.ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'return ' + value_name + '\n';
  return code;
};
