import useOrderFormStoreV3 from '@/modules/blockchains/Buy/stores/index_v3';
import useDragStore from '@/modules/blockchains/Buy/stores/useDragStore';
import useModelCategoriesStore from '@/modules/blockchains/Buy/stores/useModelCategoriesStore';
import { IModelCategory } from '@/types/customize-model';
import { useSearchParams } from 'next/navigation';
import { cloneDeep } from '../utils';

export default function useTemplate() {
  const searchParams = useSearchParams();
  const { setDraggedFields } = useDragStore();
  const { parsedCategories, categoriesTemplates } = useModelCategoriesStore();
  const { field, setField, setFields } = useOrderFormStoreV3();

  // console.log('useTemplate -> field', field);

  const setTemplate = (template: IModelCategory[]) => {
    const newFields = cloneDeep(field);

    template.forEach((_field) => {
      newFields[_field.key] = {
        value: null,
        dragged: false,
      };
      // newFields[_field.key].value = _field.options[0].key || null;
      // newFields[_field.key].dragged = false;
    });

    const fieldsNotInTemplate = parsedCategories?.filter(
      (item) => !template.find((temp) => temp.key === item.key),
    );

    const _draggedFields: string[] = [];
    template.forEach((_field) => {
      if (_field.multiChoice) {
        newFields[_field.key].value = _field.options.map(
          (option) => option.key,
        );
        newFields[_field.key].dragged = true;
      } else {
        newFields[_field.key].value = _field.options[0].key;
        newFields[_field.key].dragged = true;
      }

      _draggedFields.push(_field.key);
    });

    fieldsNotInTemplate?.forEach((field) => {
      newFields[field.key].value = null;
      newFields[field.key].dragged = false;
    });

    setDraggedFields(_draggedFields);
    setFields(newFields);
  };

  const setValueOfPackage = (packageId: number | string | null) => {
    if (!packageId?.toString()) return;
    setDraggedFields([]);

    // set default value for package
    const templateData = (categoriesTemplates?.[Number(packageId)] ||
      []) as IModelCategory[];
    setTemplate(templateData);
  };

  const initTemplate = (crPackage?: number) => {
    const packageId = crPackage ?? (searchParams.get('use-case') || '-1');

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

  return {
    initTemplate,
    setTemplate,
  };
}