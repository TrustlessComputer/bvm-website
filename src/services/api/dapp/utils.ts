import { IDappConfigs, ITemplate } from '@/services/api/dapp/types';
import { getMockupTemplate } from '@/services/api/dapp/constants';

const parseString = (str: string) => {
    try {
        return JSON.parse(str);
    } catch (e) {
        return undefined;
    }
}

const templateMapper = (configs: IDappConfigs) => {
    let template: ITemplate = parseString(configs.template as any);
    // empty template
    if (!template || !template?.template_1) {
        template = getMockupTemplate(configs);
    }
    return {
      ...template,
      headerMenu: template?.headerMenu && template.headerMenu?.some(item => item?.slug && item?.title) ? template.headerMenu : [{
        slug: '',
        title: '',
        isNewWindow: false
      }],
    };
};

export {
    templateMapper
}
