export const codeString = '    function forward(MaxPooling2DLayer memory layer, SD59x18[][][] memory x) \n' +
  '\t\tinternal pure returns (SD59x18[][][] memory) {\n' +
  '\t\tTensors.Tensor3D memory xt = Tensor3DMethods.from(x);\n' +
  '\t\tTensors.Tensor3D memory yt = xt.maxPooling2D(layer.stride, layer.size, layer.padding);\n' +
  '\t\treturn yt.mat;\n' +
  '\t}\n' +
  '\n' +
  '\tfunction forward(Conv2DLayer memory layer, SD59x18[][][] memory x) \n' +
  '\t\tinternal pure returns (SD59x18[][][] memory) {\n' +
  '\t\tTensors.Tensor3D memory xt = Tensor3DMethods.from(x);\n' +
  '\t\tTensors.Tensor4D memory wt = layer.w;\n' +
  '\t\tTensors.Tensor1D memory bt = layer.b;\n' +
  '\t\tTensors.Tensor3D memory yt = xt.conv2D(wt, layer.stride, layer.padding).add(bt);\n' +
  '\t\tTensors.Tensor3D memory zt = yt.activation(layer.activation);\n' +
  '\t\treturn zt.mat;\n' +
  '\t}';

