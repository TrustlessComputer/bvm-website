import { useOptionInputStore } from '@/modules/agent-studio/Buy/component4/DappRenderer/OptionInputValue/useOptionInputStore';
import useOrderFormStoreV3 from '@/modules/agent-studio/Buy/stores/index_v3';
import useDragStore from '@/modules/agent-studio/Buy/stores/useDragStore';
import useModelCategoriesStore from '@/modules/agent-studio/Buy/stores/useModelCategoriesStore';
import { IModelCategory } from '@/types/customize-model';
import { useSearchParams } from 'next/navigation';
import { cloneDeep } from '../utils';

export default function useTemplate() {
  const searchParams = useSearchParams();
  const { setValue } = useOptionInputStore();

  const setDraggedFields = useDragStore((state) => state.setDraggedFields);

  const parsedCategories = useModelCategoriesStore(
    (state) => state.parsedCategories,
  );
  const categoriesTemplates = useModelCategoriesStore(
    (state) => state.categoriesTemplates,
  );

  const field = useOrderFormStoreV3((state) => state.field);
  const setFields = useOrderFormStoreV3((state) => state.setFields);
  const setField = useOrderFormStoreV3((state) => state.setField);

  const setTemplate = (template: IModelCategory[]) => {
    if (template.length === 0) {
      return;
    }

    const newFields = cloneDeep(field);

    template.forEach((_field) => {
      newFields[_field.key] = {
        value: null,
        dragged: false,
      };
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
        newFields[_field.key].value = _field.options[0]?.key || null;
        newFields[_field.key].dragged = true;
      }
      _field.options.forEach((option) => {
        if (option.addOnInputs) {
          setValue(option.key, option.addOnInputs.attrs?.value);
        }
      });

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
