import useDragStore from '@/modules/blockchains/Buy/stores/useDragStore';
import React from 'react';
import useOrderFormStoreV3 from '@/modules/blockchains/Buy/stores/index_v3';
import { useSearchParams } from 'next/navigation';
import useModelCategoriesStore from '@/modules/blockchains/Buy/stores/useModelCategoriesStore';
import { IModelCategory } from '@types/customize-model';

export default function useTemplate(){

  const searchParams = useSearchParams();
  const [currentPackage, setCurrentPackage] = React.useState<number | null>(null);
  const { draggedFields, setDraggedFields } = useDragStore();
  const [templates, setTemplates] = React.useState<Array<
    IModelCategory[]
  > | null>(null);

  const {
    parsedCategories: data,
  } = useModelCategoriesStore();

  const {
    field,
    setField,
  } = useOrderFormStoreV3();

  const setValueOfPackage = (packageId: number | string | null) => {
    if (!packageId?.toString()) return;
    setDraggedFields([]);
    setCurrentPackage(Number(packageId));

    // set default value for package
    const templateData = (templates?.[Number(packageId)] ||
      []) as IModelCategory[];
    const fieldsNotInTemplate = data?.filter(
      (item) => !templateData.find((temp) => temp.key === item.key),
    );

    const _draggedFields: string[] = [];
    templateData.forEach((_field) => {
      if (_field.multiChoice) {
        setField(
          _field.key,
          _field.options.map((option) => option.key),
          _field.options[0] ? true : false,
        );
      } else {
        setField(
          _field.key,
          _field.options[0].key || null,
          _field.options[0] ? true : false,
        );
      }

      _draggedFields.push(_field.key);
    });
    setDraggedFields(_draggedFields);

    fieldsNotInTemplate?.forEach((field) => {
      setField(field.key, null, false);
    });
  };


  const initTemplate = (crPackage?: number) => {
    const packageId =
      typeof crPackage !== 'undefined'
        ? crPackage
        : searchParams.get('use-case') || '-1';

    const oldForm = localStorage.getItem('bvm.customize-form') || `[]`;
    const form = JSON.parse(oldForm) as IModelCategory[];

    if (form.length === 0 || packageId !== '-1') {
      setValueOfPackage(Number(packageId));
    } else {
      for (const key in field) {
        setField(key, null, false);
      }
    }
  };

  const setTemplateDataClone = (data: IModelCategory[]) => {
    // set default value for package
    const templateData = data;
    const fieldsNotInTemplate = data?.filter(
      (item) => !templateData.find((temp) => temp.key === item.key),
    );

    const _draggedFields: string[] = [];
    templateData.forEach((_field) => {
      if (_field.multiChoice) {
        setField(
          _field.key,
          _field.options.map((option) => option.key),
          _field.options[0] ? true : false,
        );
      } else {
        setField(
          _field.key,
          _field.options[0].key || null,
          _field.options[0] ? true : false,
        );
      }

      _draggedFields.push(_field.key);
    });
    setDraggedFields(_draggedFields);

    fieldsNotInTemplate?.forEach((field) => {
      setField(field.key, null, false);
    });
  };

  return {
    templates,
    initTemplate,
    setTemplates,
    setTemplateDataClone
  }



}
