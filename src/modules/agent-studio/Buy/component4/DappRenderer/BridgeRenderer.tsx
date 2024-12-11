// import React from 'react';

// import ChainDraggable from '@/modules/agent-studio/Buy/components3/Draggable';
// import DroppableV2 from '@/modules/agent-studio/Buy/components3/DroppableV2';
// import LegoV3 from '@/modules/agent-studio/Buy/components3/LegoV3';
// import { useChainProvider } from '@/modules/agent-studio/detail_v4/provider/ChainProvider.hook';
// import { IModelCategory } from '@/types/customize-model';
// import Label from '../../components3/Label';
// import ChainLegoParent from '../../components3/LegoParent';
// import useOrderFormStoreV3 from '../../stores/index_v3';
// import useDragStore from '../../stores/useDragStore';
// import useModelCategoriesStore from '../../stores/useModelCategoriesStore';
// import useOverlappingChainLegoStore from '../../stores/useOverlappingChainLegoStore';

// import OptionInputValue from '@/modules/agent-studio/Buy/component4/DappRenderer/OptionInputValue';
// import styles from './styles.module.scss';
// import { useBridgesModule } from '@/modules/agent-studio/detail_v4/hook/useBridgesModule';
// import { Link } from '@chakra-ui/react';

// const BridgeRenderer = () => {
//   const { parsedCategories } = useModelCategoriesStore();
//   const { draggedFields } = useDragStore();
//   const { overlappingId } = useOverlappingChainLegoStore();
//   const { field } = useOrderFormStoreV3();
//   const { detailBridgesMapperStatus } = useBridgesModule();

//   const { order, isUpdateFlow, selectedCategoryMapping } = useChainProvider();

//   return (
//     <DroppableV2
//       key={draggedFields.length}
//       id="final_2"
//       style={{
//         width: '100% !important',
//         height: '100%',
//         padding: '20px 25px',
//       }}
//     >
//       {draggedFields.map((key, index) => {
//         if (key !== 'bridge_apps') return null;

//         const item = parsedCategories?.find((i) => i.key === key);
//         const selectedCategory = selectedCategoryMapping?.[key];

//         if (!item || !parsedCategories) return null;

//         if (item.multiChoice) {
//           if (!Array.isArray(field[item.key].value)) return;

//           const childrenOptions = (field[item.key].value as
//             | string[]
//             | number[])!.map((key: string | number, opIdx: number) => {
//             const option = item.options.find((opt) => opt.key === key);

//             if (!option) return null;

//             const itemDetailMapper =
//               detailBridgesMapperStatus[option.key] || {};
//             const {
//               isDone,
//               label: labelDetail,
//               backgroundColor: backgroundColorDetail,
//               textColor: textColorDetail,
//               appURL,
//             } = itemDetailMapper;

//             return (
//               <ChainDraggable
//                 right
//                 key={item.key + '-' + option.key}
//                 id={item.key + '-' + option.key}
//                 useMask
//                 tooltip={item.tooltip}
//                 value={{
//                   isChain: true,
//                   value: option.key,
//                   rightDragging: true,
//                   background: item.color,
//                   label: option.title,
//                   icon: option.icon,
//                 }}
//                 disabled={
//                   isUpdateFlow &&
//                   !!selectedCategoryMapping?.[item.key]?.options.find(
//                     (opt) => opt.key === option.key,
//                   )
//                 }
//               >
//                 <DroppableV2 id={item.key + '-right'}>
//                   <LegoV3
//                     background={item.color}
//                     label={item.confuseTitle}
//                     labelInRight={!!item.confuseTitle || !!item.confuseIcon}
//                     icon={item.confuseIcon}
//                     zIndex={item.options.length - opIdx}
//                     // TODO: @Tony
//                     status={
//                       isDone
//                         ? undefined
//                         : {
//                             label: labelDetail,
//                             backgroundColor: backgroundColorDetail,
//                             textColor: textColorDetail,
//                           }
//                     }
//                     suffixView={
//                       isDone ? (
//                         <Link
//                           href={`${appURL || '--'}`}
//                           target={'_blank'}
//                           cursor={'pointer'}
//                           textDecoration={'underline'}
//                         >
//                           View
//                         </Link>
//                       ) : undefined
//                     }
//                   >
//                     <Label icon={option.icon} title={option.title} />
//                   </LegoV3>
//                 </DroppableV2>
//               </ChainDraggable>
//             );
//           });

//           return (
//             <ChainDraggable
//               id={item.key + '-parent' + '-right'}
//               useMask
//               value={{
//                 isChain: true,
//                 rightDragging: true,
//                 background: item.color,
//                 label: item.title,
//                 icon: '',
//                 parent: true,
//               }}
//               disabled={isUpdateFlow}
//             >
//               <DroppableV2 id={item.key}>
//                 <ChainLegoParent
//                   parentOfNested
//                   background={item.color}
//                   label={item.title}
//                   zIndex={draggedFields.length - index - 1}
//                 >
//                   {childrenOptions}
//                 </ChainLegoParent>
//               </DroppableV2>
//             </ChainDraggable>
//           );
//         }

//         return item.options.map((option, opIdx) => {
//           if (option.key !== field[item.key].value) return null;

//           const isUpdatable =
//             option.key !== 'general_idea' && // Must be hard coded
//             selectedCategory?.updatable && //
//             isUpdateFlow;

//           return (
//             <ChainDraggable
//               right
//               id={item.key + '-' + option.key + '-right'}
//               useMask
//               tooltip={item.tooltip}
//               value={{
//                 isChain: true,
//                 rightDragging: true,
//                 background: item.color,
//                 label: item.title,
//                 icon: '',
//                 parent: true,
//               }}
//               disabled={isUpdateFlow}
//             >
//               <DroppableV2 id={item.key + '-right'}>
//                 <LegoV3
//                   updatable={isUpdatable}
//                   allowShuffle
//                   background={item.color}
//                   label={item.confuseTitle}
//                   labelInRight={!!item.confuseTitle || !!item.confuseIcon}
//                   zIndex={draggedFields.length - index}
//                   icon={item.confuseIcon}
//                   className={
//                     overlappingId === field[item.key].value
//                       ? styles.activeBlur
//                       : ''
//                   }
//                 >
//                   {option.addOnInputs ? (
//                     <OptionInputValue option={option} />
//                   ) : (
//                     <Label icon={option.icon} title={option.title} />
//                   )}
//                 </LegoV3>
//               </DroppableV2>
//             </ChainDraggable>
//           );
//         });
//       })}
//     </DroppableV2>
//   );
// };

// export default BridgeRenderer;
