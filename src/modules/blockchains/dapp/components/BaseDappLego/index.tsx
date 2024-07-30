// import React from 'react';

// import LegoParent from '../LegoParent';
// import Lego from '../Lego';
// import Input from '../Input';
// import Dropdown from '../Dropdown';
// import { adjustBrightness } from '../../utils';
// import InitData from './InitData';
// import { useFormDappsStore } from '../../stores/useDappStore';
// import AddNewAllocationLego from './AddNewAllocationLego';

// type Props = DappModel & {
//   _key: string;
// };

// const yesNoOptions: FieldModel[] = [
//   {
//     key: 'yes',
//     title: 'Yes',
//     type: 'input',
//     icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
//     value: 1,
//     tooltip: '',
//   },
//   {
//     key: 'no',
//     title: 'No',
//     type: 'input',
//     icon: 'https://storage.googleapis.com/bvm-network/icons-tool/icon-eth.svg',
//     value: 0,
//     tooltip: '',
//   },
// ];

// const BaseDappLego = ({ _key, ...thisDapp }: Props) => {
//   const {
//     title,
//     color,
//     baseBlock: requiredFields,
//     optionalField: blockFields,
//   } = thisDapp;

//   const totalFields =
//     requiredFields.length +
//     blockFields
//       .map((o) => o.fields.length)
//       .reduce((acc, cur) => acc + cur, 0);

//   const getCommonLego = React.useCallback(
//     (
//       zIndex: number,
//       field: FieldModel,
//       required: boolean,
//       optionalIndex?: number,
//     ) => {
//       const newColor = required
//         ? adjustBrightness(thisDapp.color, -10)
//         : adjustBrightness(thisDapp.color, -20);

//       if (field.type === 'input') {
//         return (
//           <Lego
//             title={field.title}
//             key={
//               (required ? 'required' : 'optional' + optionalIndex) + field.key
//             }
//             titleInLeft
//             zIndex={totalFields - zIndex - (optionalIndex ?? 0)}
//             background={newColor}
//           >
//             <Input
//               key={
//                 (required ? 'required' : 'optional' + optionalIndex) + field.key
//               }
//               required={required}
//               optionalIndex={optionalIndex}
//               name={field.key}
//               _key={_key}
//             />
//           </Lego>
//         );
//       }

//       if (field.type === 'dropdown') {
//         return (
//           <Lego
//             title={field.title}
//             key={
//               (required ? 'required' : 'optional' + optionalIndex) + field.key
//             }
//             titleInLeft
//             zIndex={totalFields - zIndex - (optionalIndex ?? 0)}
//             background={newColor}
//           >
//             <Dropdown
//               required={required}
//               optionalIndex={optionalIndex}
//               options={field.options || []}
//               key={
//                 (required ? 'required' : 'optional' + optionalIndex) + field.key
//               }
//               _key={_key}
//               name={field.key}
//               background={newColor}
//             />
//           </Lego>
//         );
//       }

//       return null;
//     },
//     [],
//   );

//   const getExtendsType = React.useCallback(
//     (
//       zIndex: number,
//       field: FieldModel,
//       level: number,
//       required: boolean,
//       optionalIndex?: number,
//     ) => {
//       const isExtended = field.value === 1;

//       const legoIfNotExtends = () => {
//         return (
//           <Lego
//             title={field.title}
//             key={field.key}
//             titleInLeft
//             zIndex={totalFields - zIndex - (optionalIndex ?? 0)}
//           >
//             <Dropdown
//               _key={_key}
//               required={required}
//               optionalIndex={optionalIndex}
//               options={yesNoOptions}
//               name={field.key}
//             />
//           </Lego>
//         );
//       };

//       const legoIfExtends = () => {
//         return (
//           <LegoParent
//             title={field.title}
//             key={field.key}
//             zIndex={
//               totalFields -
//               zIndex -
//               (optionalIndex ?? 0) -
//               (field.options || []).length
//             }
//           >
//             {(field.options || []).map((option, index) => {
//               return getExtendsType(
//                 index,
//                 option,
//                 level + 1,
//                 required,
//                 optionalIndex,
//               );
//             })}
//           </LegoParent>
//         );
//       };

//       if (field.type === 'input') {
//         return (
//           <Lego title={field.title} key={field.key} titleInLeft>
//             <Input
//               required={required}
//               optionalIndex={optionalIndex}
//               name={field.key}
//               _key={_key}
//             />
//           </Lego>
//         );
//       }

//       if (field.type === 'dropdown') {
//         return (
//           <Lego title={field.title} key={field.key} titleInLeft>
//             <Dropdown
//               _key={_key}
//               required={required}
//               optionalIndex={optionalIndex}
//               options={field.options || []}
//               name={field.key}
//             />
//           </Lego>
//         );
//       }

//       return isExtended ? legoIfExtends() : legoIfNotExtends();
//     },
//     [],
//   );

//   return (
//     <React.Fragment>
//       <InitData _key={_key} {...thisDapp} />

//       <LegoParent title={title} key={thisDapp.id} background={color}>
//         {thisDapp.baseBlock.map((field, index) => {
//           if (field.type !== 'extends') {
//             return getCommonLego(index, field, true);
//           } else {
//             // return getExtendsType(index, field, 0, true);
//           }
//         })}

//         {thisDapp.optionalField.map((optionalField, optionalIndex) => {
//           return (
//             <LegoParent
//               title={optionalField.title}
//               key={optionalField.key}
//               background={adjustBrightness(thisDapp.color, -10)}
//             >
//               {optionalField.fields.map((field, index) => {
//                 if (field.type !== 'extends') {
//                   return getCommonLego(index, field, false, optionalIndex);
//                 } else {
//                   // return getExtendsType(index, field, 0, false, optionalIndex);
//                 }
//               })}
//             </LegoParent>
//           );
//         })}

//         <AddNewAllocationLego _key={_key} {...thisDapp} />
//       </LegoParent>
//     </React.Fragment>
//   );
// };

// export default BaseDappLego;
