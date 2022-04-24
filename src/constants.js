import { Platform } from 'react-native';
import Constant from 'expo-constants';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const isIOS = Platform.OS === 'ios';
const { statusBarHeight } = Constant;

export const stickyHeaderHeight = 50;
export const modalSelectorStyles = (fontFactor) => {
    return {
        sectionTextStyle: {
            fontSize: fontFactor * wp(4.5),
            lineHeight: fontFactor * wp(5.72),
            fontFamily: 'Karla_500Medium',
        },
        optionContainerStyle: {
            backgroundColor: '#fff',
            marginBottom: fontFactor * wp(2.2),
        },
        cancelStyle: {
            backgroundColor: '#ddd',
            padding: fontFactor * wp(2.2),
            borderRadius: fontFactor * wp(1.35),
            marginBottom: fontFactor * wp(2.2),
        },
        optionTextStyle: {
            color: 'black',
            fontSize: fontFactor * wp(4.5),
            lineHeight: fontFactor * wp(5.72),
            fontFamily: 'Karla_400Regular',
        },
        cancelTextStyle: {
            color: 'red',
            fontSize: fontFactor * wp(4.5),
            lineHeight: fontFactor * wp(5.72),
            fontFamily: 'Karla_400Regular',
        },
        overlayStyle: {
            backgroundColor: 'rgba(0,0,0,0.9)',
            marginTop: isIOS ? statusBarHeight : 0,
        },
        touchableActiveOpacity: 0.6,
    };
};

export const Home = 'Home';
export const About = 'About';
export const Services = 'Services';
export const Contact = 'Contact';
export const ForumStack = 'ForumStack';
export const comment = 'comment'

export const serviceDetails = [
    {
        title: `General Information\nTechnology Consulting`,
        body: 'We offer an automated and integrated accounting software to meet the needs of organisations. We deploy tested and time-proven solution to provide solutions to your accounting problems; the modules will normally include invoicing/billing, general ledger, receivables, payables, inventory, cash and bank, payroll, etc. Our primary objective is to help organisations gain insights into their business and make informed decisions. Organisations are also able to manage and monitor their financial activities, generate periodic financial management reports including profit and loss reports, balance sheet, statements of cashflow and detailed accounts and statistical activity reports among others',
    },
    {
        title: `Accounting Software &\nFinancial Management`,
        body: 'We offer an automated and integrated accounting software to meet the needs of organisations. We deploy tested and time-proven solution to provide solutions to your accounting problems; the modules will normally include invoicing/billing, general ledger, receivables, payables, inventory, cash and bank, payroll, etc. Our primary objective is to help organisations gain insights into their business and make informed decisions. Organisations are also able to manage and monitor their financial activities, generate periodic financial management reports including profit and loss reports, balance sheet, statements of cashflow and detailed accounts and statistical activity reports among others',
    },
    {
        title: `Internal Control &\nCompliance Audit`,
        body: 'We help organisations to identify, assess and control risks in business processes, procedures and financial reporting in order to ensure organisations operates in a more efficient environment, reduce costs and safeguard their assets. Our team documents observations clearly and provide appropriate recommendations. Our compliance checklist tool helps organisations ensure compliance with government, industry and internal control regulations and standards as well as corporate governance systems. It also helps organisations discover gaps in processes that can be improved.',
    },
    {
        title: `Cloud Accounting`,
        body: 'In addition to traditional desktop accounting, we offer cloud accounting services to organisations who desires flexible, convenience and cost-effective way to work 24/7 and anywhere. Payment for cloud accounting is subscription-based and charges can be scaled up or down according to the needs of its subscriber. It provides opportunity for organisations to gain advantages on latest modifications, updates and improvements at no extra cost. It also eliminates most upfront cost as client does not need investment in server and related costs.',
    },
    {
        title: `Technology & Management\nDevelopment Training`,
        body: 'We believe employees must be trained to get the required knowledge, skills and attitudes to meet work challenges and solve business problems. On this premise, we offer training programmes on how employees and managers can increase their efficiencies and deliver value to an organisation. Our training help organisations to leverage on technological products and services to improve overall organizational performance and success.',
    },
    {
        title: `Feasibility &\nBusiness Planning`,
        body: 'We help organisations to prepare professional feasibility and business plan. Our feasibility and business plan are customized to meet specific needs of an established and new company. Our primary objective is to create a good proposal that will give you a clear picture or blueprint of your business and also open doors to investors and financial institutions.',
    },
    {
        title: `Fixed Assets \nManagement (FAM)`,
        body: "Our company recognizes the importance of fixed assets' investment in business; the lack of platform to keep proper records of fixed assets can result to misplacement and loss of some of these items. With FAM, organizations are able to capture, track and manage their fixed assets. The FAM addresses all functions relating to assets acquisition, allocation and disposal of assets easily. The monthly depreciation of fixed assets is computed automatically and linked to core accounting business platform. The FAM also provide insights through dashboards and several reports.",
    },
];
