import { IDappConfigs, ITemplate } from '@/services/api/dapp/types';
import { getMockupTemplate } from '@/services/api/dapp/constants';

const templateMapper = (configs: IDappConfigs) => {
    let template: ITemplate = configs.template;
    // empty template
    if (!template || !template?.template_1) {
        template = getMockupTemplate(configs);
    }
    return template;
};

export {
    templateMapper
}
