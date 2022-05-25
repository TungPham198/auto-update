import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleSetLanguages } from "../../../redux/components/browser/browserSilce";
import MultiToast from "../../../components/defaultToast";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

function fotmatData(listLanguages) {
    listLanguages = listLanguages.map((item, index) => {
        return {
            name: item.name,
            value: (1 - index / 10).toFixed(1),
        };
    });
    return listLanguages;
}

function ModalListLanguages({ isShowing, modalName, data, hide }) {
    const dispatch = useDispatch();
    const [t, i18n] = useTranslation();
    
    const listLanguages = [
        { value: "af", name: "Afrikaans" },
        { value: "af-NA", name: "Afrikaans (Namibia)" },
        { value: "af-ZA", name: "Afrikaans (South Africa)" },
        { value: "ak", name: "Akan" },
        { value: "ak-GH", name: "Akan (Ghana)" },
        { value: "sq", name: "Albanian" },
        { value: "sq-AL", name: "Albanian (Albania)" },
        { value: "sq-XK", name: "Albanian (Kosovo)" },
        { value: "sq-MK", name: "Albanian (Macedonia)" },
        { value: "am", name: "Amharic" },
        { value: "am-ET", name: "Amharic (Ethiopia)" },
        { value: "ar", name: "Arabic" },
        { value: "ar-DZ", name: "Arabic (Algeria)" },
        { value: "ar-BH", name: "Arabic (Bahrain)" },
        { value: "ar-TD", name: "Arabic (Chad)" },
        { value: "ar-KM", name: "Arabic (Comoros)" },
        { value: "ar-DJ", name: "Arabic (Djibouti)" },
        { value: "ar-EG", name: "Arabic (Egypt)" },
        { value: "ar-ER", name: "Arabic (Eritrea)" },
        { value: "ar-IQ", name: "Arabic (Iraq)" },
        { value: "ar-IL", name: "Arabic (Israel)" },
        { value: "ar-JO", name: "Arabic (Jordan)" },
        { value: "ar-KW", name: "Arabic (Kuwait)" },
        { value: "ar-LB", name: "Arabic (Lebanon)" },
        { value: "ar-LY", name: "Arabic (Libya)" },
        { value: "ar-MR", name: "Arabic (Mauritania)" },
        { value: "ar-MA", name: "Arabic (Morocco)" },
        { value: "ar-OM", name: "Arabic (Oman)" },
        { value: "ar-PS", name: "Arabic (Palestinian Territories)" },
        { value: "ar-QA", name: "Arabic (Qatar)" },
        { value: "ar-SA", name: "Arabic (Saudi Arabia)" },
        { value: "ar-SO", name: "Arabic (Somalia)" },
        { value: "ar-SS", name: "Arabic (South Sudan)" },
        { value: "ar-SD", name: "Arabic (Sudan)" },
        { value: "ar-SY", name: "Arabic (Syria)" },
        { value: "ar-TN", name: "Arabic (Tunisia)" },
        { value: "ar-AE", name: "Arabic (United Arab Emirates)" },
        { value: "ar-EH", name: "Arabic (Western Sahara)" },
        { value: "ar-YE", name: "Arabic (Yemen)" },
        { value: "hy", name: "Armenian" },
        { value: "hy-AM", name: "Armenian (Armenia)" },
        { value: "as", name: "Assamese" },
        { value: "as-IN", name: "Assamese (India)" },
        { value: "az", name: "Azerbaijani" },
        { value: "az-AZ", name: "Azerbaijani (Azerbaijan)" },
        {
            value: "az-Cyrl-AZ",
            name: "Azerbaijani (Cyrillic, Azerbaijan)",
        },
        { value: "az-Cyrl", name: "Azerbaijani (Cyrillic)" },
        {
            value: "az-Latn-AZ",
            name: "Azerbaijani (Latin, Azerbaijan)",
        },
        { value: "az-Latn", name: "Azerbaijani (Latin)" },
        { value: "bm", name: "Bambara" },
        { value: "bm-Latn-ML", name: "Bambara (Latin, Mali)" },
        { value: "bm-Latn", name: "Bambara (Latin)" },
        { value: "eu", name: "Basque" },
        { value: "eu-ES", name: "Basque (Spain)" },
        { value: "be", name: "Belarusian" },
        { value: "be-BY", name: "Belarusian (Belarus)" },
        { value: "bn", name: "Bengali" },
        { value: "bn-BD", name: "Bengali (Bangladesh)" },
        { value: "bn-IN", name: "Bengali (India)" },
        { value: "bs", name: "Bosnian" },
        { value: "bs-BA", name: "Bosnian (Bosnia and Herzegovina)" },
        {
            value: "bs-Cyrl-BA",
            name: "Bosnian (Cyrillic, Bosnia and Herzegovina)",
        },
        { value: "bs-Cyrl", name: "Bosnian (Cyrillic)" },
        {
            value: "bs-Latn-BA",
            name: "Bosnian (Latin, Bosnia and Herzegovina)",
        },
        { value: "bs-Latn", name: "Bosnian (Latin)" },
        { value: "br", name: "Breton (br)" },
        { value: "br-FR", name: "Breton (France)" },
        { value: "bg", name: "Bulgarian" },
        { value: "bg-BG", name: "Bulgarian (Bulgaria)" },
        { value: "my", name: "Burmese" },
        { value: "my-MM", name: "Burmese (Myanmar (Burma))" },
        { value: "ca", name: "Catalan (ca)" },
        { value: "ca-AD", name: "Catalan (Andorra)" },
        { value: "ca-FR", name: "Catalan (France)" },
        { value: "ca-IT", name: "Catalan (Italy)" },
        { value: "ca-ES", name: "Catalan (Spain)" },
        { value: "zh", name: "Chinese" },
        { value: "zh-CN", name: "Chinese (China)" },
        { value: "zh-HK", name: "Chinese (Hong Kong SAR China)" },
        { value: "zh-MO", name: "Chinese (Macau SAR China)" },
        { value: "zh-Hans-CN", name: "Chinese (Simplified, China)" },
        {
            value: "zh-Hans-HK",
            name: "Chinese (Simplified, Hong Kong SAR China)",
        },
        {
            value: "zh-Hans-MO",
            name: "Chinese (Simplified, Macau SAR China)",
        },
        {
            value: "zh-Hans-SG",
            name: "Chinese (Simplified, Singapore)",
        },
        { value: "zh-Hans", name: "Chinese (Simplified)" },
        { value: "zh-SG", name: "Chinese (Singapore)" },
        { value: "zh-TW", name: "Chinese (Taiwan)" },
        {
            value: "zh-Hant-HK",
            name: "Chinese (Traditional, Hong Kong SAR China)",
        },
        {
            value: "zh-Hant-MO",
            name: "Chinese (Traditional, Macau SAR China)",
        },
        { value: "zh-Hant-TW", name: "Chinese (Traditional, Taiwan)" },
        { value: "zh-Hant", name: "Chinese (Traditional)" },
        { value: "kw", name: "Cornish" },
        { value: "kw-GB", name: "Cornish (United Kingdom)" },
        { value: "hr", name: "Croatian" },
        { value: "hr-BA", name: "Croatian (Bosnia and Herzegovina)" },
        { value: "hr-HR", name: "Croatian (Croatia)" },
        { value: "cs", name: "Czech" },
        { value: "cs-CZ", name: "Czech (Czech Republic)" },
        { value: "da", name: "Danish" },
        { value: "da-DK", name: "Danish (Denmark)" },
        { value: "da-GL", name: "Danish (Greenland)" },
        { value: "nl", name: "Dutch" },
        { value: "nl-AW", name: "Dutch (Aruba)" },
        { value: "nl-BE", name: "Dutch (Belgium)" },
        { value: "nl-BQ", name: "Dutch (Caribbean Netherlands)" },
        { value: "nl-CW", name: "Dutch (Curaçao)" },
        { value: "nl-NL", name: "Dutch (Netherlands)" },
        { value: "nl-SX", name: "Dutch (Sint Maarten)" },
        { value: "nl-SR", name: "Dutch (Surivalue)" },
        { value: "dz", name: "Dzongkha" },
        { value: "dz-BT", name: "Dzongkha (Bhutan)" },
        { value: "en", name: "English" },
        { value: "en-AS", name: "English (American Samoa)" },
        { value: "en-AI", name: "English (Anguilla)" },
        { value: "en-AG", name: "English (Antigua and Barbuda)" },
        { value: "en-AU", name: "English (Australia)" },
        { value: "en-BS", name: "English (Bahamas)" },
        { value: "en-BB", name: "English (Barbados)" },
        { value: "en-BE", name: "English (Belgium)" },
        { value: "en-BZ", name: "English (Belize)" },
        { value: "en-BM", name: "English (Bermuda)" },
        { value: "en-BW", name: "English (Botswana)" },
        {
            value: "en-IO",
            name: "English (British Indian Ocean Territory)",
        },
        { value: "en-VG", name: "English (British Virgin Islands)" },
        { value: "en-CM", name: "English (Cameroon)" },
        { value: "en-CA", name: "English (Canada)" },
        { value: "en-KY", name: "English (Cayman Islands)" },
        { value: "en-CX", name: "English (Christmas Island)" },
        { value: "en-CC", name: "English (Cocos (Keeling) Islands)" },
        { value: "en-CK", name: "English (Cook Islands)" },
        { value: "en-DG", name: "English (Diego Garcia)" },
        { value: "en-DM", name: "English (Dominica)" },
        { value: "en-ER", name: "English (Eritrea)" },
        { value: "en-FK", name: "English (Falkland Islands)" },
        { value: "en-FJ", name: "English (Fiji)" },
        { value: "en-GM", name: "English (Gambia)" },
        { value: "en-GH", name: "English (Ghana)" },
        { value: "en-GI", name: "English (Gibraltar)" },
        { value: "en-GD", name: "English (Grenada)" },
        { value: "en-GU", name: "English (Guam)" },
        { value: "en-GG", name: "English (Guernsey)" },
        { value: "en-GY", name: "English (Guyana)" },
        { value: "en-HK", name: "English (Hong Kong SAR China)" },
        { value: "en-IN", name: "English (India)" },
        { value: "en-IE", name: "English (Ireland)" },
        { value: "en-IM", name: "English (Isle of Man)" },
        { value: "en-JM", name: "English (Jamaica)" },
        { value: "en-JE", name: "English (Jersey)" },
        { value: "en-KE", name: "English (Kenya)" },
        { value: "en-KI", name: "English (Kiribati)" },
        { value: "en-LS", name: "English (Lesotho)" },
        { value: "en-LR", name: "English (Liberia)" },
        { value: "en-MO", name: "English (Macau SAR China)" },
        { value: "en-MG", name: "English (Madagascar)" },
        { value: "en-MW", name: "English (Malawi)" },
        { value: "en-MY", name: "English (Malaysia)" },
        { value: "en-MT", name: "English (Malta)" },
        { value: "en-MH", name: "English (Marshall Islands)" },
        { value: "en-MU", name: "English (Mauritius)" },
        { value: "en-FM", name: "English (Micronesia)" },
        { value: "en-MS", name: "English (Montserrat)" },
        { value: "en-NA", name: "English (Namibia)" },
        { value: "en-NR", name: "English (Nauru)" },
        { value: "en-NZ", name: "English (New Zealand)" },
        { value: "en-NG", name: "English (Nigeria)" },
        { value: "en-NU", name: "English (Niue)" },
        { value: "en-NF", name: "English (Norfolk Island)" },
        { value: "en-MP", name: "English (Northern Mariana Islands)" },
        { value: "en-PK", name: "English (Pakistan)" },
        { value: "en-PW", name: "English (Palau)" },
        { value: "en-PG", name: "English (Papua New Guinea)" },
        { value: "en-PH", name: "English (Philippines)" },
        { value: "en-PN", name: "English (Pitcairn Islands)" },
        { value: "en-PR", name: "English (Puerto Rico)" },
        { value: "en-RW", name: "English (Rwanda)" },
        { value: "en-SH", name: "English (Saint Helena)" },
        { value: "en-KN", name: "English (Saint Kitts and Nevis)" },
        { value: "en-LC", name: "English (Saint Lucia)" },
        { value: "en-WS", name: "English (Samoa)" },
        { value: "en-SC", name: "English (Seychelles)" },
        { value: "en-SL", name: "English (Sierra Leone)" },
        { value: "en-SG", name: "English (Singapore)" },
        { value: "en-SX", name: "English (Sint Maarten)" },
        { value: "en-SB", name: "English (Solomon Islands)" },
        { value: "en-ZA", name: "English (South Africa)" },
        { value: "en-SS", name: "English (South Sudan)" },
        { value: "en-VC", name: "English (St. Vincent &amp; Grenadines)" },
        { value: "en-SD", name: "English (Sudan)" },
        { value: "en-SZ", name: "English (Swaziland)" },
        { value: "en-TZ", name: "English (Tanzania)" },
        { value: "en-TK", name: "English (Tokelau)" },
        { value: "en-TO", name: "English (Tonga)" },
        { value: "en-TT", name: "English (Trinidad and Tobago)" },
        { value: "en-TC", name: "English (Turks and Caicos Islands)" },
        { value: "en-TV", name: "English (Tuvalu)" },
        { value: "en-UM", name: "English (U.S. Outlying Islands)" },
        { value: "en-VI", name: "English (U.S. Virgin Islands)" },
        { value: "en-UG", name: "English (Uganda)" },
        { value: "en-GB", name: "English (United Kingdom)" },
        { value: "en-US", name: "English (United States)" },
        { value: "en-VU", name: "English (Vanuatu)" },
        { value: "en-ZM", name: "English (Zambia)" },
        { value: "en-ZW", name: "English (Zimbabwe)" },
        { value: "eo", name: "Esperanto" },
        { value: "et", name: "Estonian" },
        { value: "et-EE", name: "Estonian (Estonia)" },
        { value: "ee", name: "Ewe" },
        { value: "ee-GH", name: "Ewe (Ghana)" },
        { value: "ee-TG", name: "Ewe (Togo)" },
        { value: "fo", name: "Faroese" },
        { value: "fo-FO", name: "Faroese (Faroe Islands)" },
        { value: "fi", name: "Finnish" },
        { value: "fi-FI", name: "Finnish (Finland)" },
        { value: "fr", name: "French" },
        { value: "fr-DZ", name: "French (Algeria)" },
        { value: "fr-BE", name: "French (Belgium)" },
        { value: "fr-BJ", name: "French (Benin)" },
        { value: "fr-BF", name: "French (Burkina Faso)" },
        { value: "fr-BI", name: "French (Burundi)" },
        { value: "fr-CM", name: "French (Cameroon)" },
        { value: "fr-CA", name: "French (Canada)" },
        { value: "fr-CF", name: "French (Central African Republic)" },
        { value: "fr-TD", name: "French (Chad)" },
        { value: "fr-KM", name: "French (Comoros)" },
        { value: "fr-CG", name: "French (Congo - Brazzaville)" },
        { value: "fr-CD", name: "French (Congo - Kinshasa)" },
        { value: "fr-CI", name: "French (Côte d’Ivoire)" },
        { value: "fr-DJ", name: "French (Djibouti)" },
        { value: "fr-GQ", name: "French (Equatorial Guinea)" },
        { value: "fr-FR", name: "French (France)" },
        { value: "fr-GF", name: "French (French Guiana)" },
        { value: "fr-PF", name: "French (French Polynesia)" },
        { value: "fr-GA", name: "French (Gabon)" },
        { value: "fr-GP", name: "French (Guadeloupe)" },
        { value: "fr-GN", name: "French (Guinea)" },
        { value: "fr-HT", name: "French (Haiti)" },
        { value: "fr-LU", name: "French (Luxembourg)" },
        { value: "fr-MG", name: "French (Madagascar)" },
        { value: "fr-ML", name: "French (Mali)" },
        { value: "fr-MQ", name: "French (Martinique)" },
        { value: "fr-MR", name: "French (Mauritania)" },
        { value: "fr-MU", name: "French (Mauritius)" },
        { value: "fr-YT", name: "French (Mayotte)" },
        { value: "fr-MC", name: "French (Monaco)" },
        { value: "fr-MA", name: "French (Morocco)" },
        { value: "fr-NC", name: "French (New Caledonia)" },
        { value: "fr-NE", name: "French (Niger)" },
        { value: "fr-RE", name: "French (Réunion)" },
        { value: "fr-RW", name: "French (Rwanda)" },
        { value: "fr-BL", name: "French (Saint Barthélemy)" },
        { value: "fr-MF", name: "French (Saint Martin)" },
        { value: "fr-PM", name: "French (Saint Pierre and Miquelon)" },
        { value: "fr-SN", name: "French (Senegal)" },
        { value: "fr-SC", name: "French (Seychelles)" },
        { value: "fr-CH", name: "French (Switzerland)" },
        { value: "fr-SY", name: "French (Syria)" },
        { value: "fr-TG", name: "French (Togo)" },
        { value: "fr-TN", name: "French (Tunisia)" },
        { value: "fr-VU", name: "French (Vanuatu)" },
        { value: "fr-WF", name: "French (Wallis and Futuna)" },
        { value: "ff", name: "Fulah" },
        { value: "ff-CM", name: "Fulah (Cameroon)" },
        { value: "ff-GN", name: "Fulah (Guinea)" },
        { value: "ff-MR", name: "Fulah (Mauritania)" },
        { value: "ff-SN", name: "Fulah (Senegal)" },
        { value: "gl", name: "Galician" },
        { value: "gl-ES", name: "Galician (Spain)" },
        { value: "lg", name: "Ganda" },
        { value: "lg-UG", name: "Ganda (Uganda)" },
        { value: "ka", name: "Georgian" },
        { value: "ka-GE", name: "Georgian (Georgia)" },
        { value: "de", name: "German" },
        { value: "de-AT", name: "German (Austria)" },
        { value: "de-BE", name: "German (Belgium)" },
        { value: "de-DE", name: "German (Germany)" },
        { value: "de-LI", name: "German (Liechtenstein)" },
        { value: "de-LU", name: "German (Luxembourg)" },
        { value: "de-CH", name: "German (Switzerland)" },
        { value: "el", name: "Greek" },
        { value: "el-CY", name: "Greek (Cyprus)" },
        { value: "el-GR", name: "Greek (Greece)" },
        { value: "gu", name: "Gujarati" },
        { value: "gu-IN", name: "Gujarati (India)" },
        { value: "ha", name: "Hausa" },
        { value: "ha-GH", name: "Hausa (Ghana)" },
        { value: "ha-Latn-GH", name: "Hausa (Latin, Ghana)" },
        { value: "ha-Latn-NE", name: "Hausa (Latin, Niger)" },
        { value: "ha-Latn-NG", name: "Hausa (Latin, Nigeria)" },
        { value: "ha-Latn", name: "Hausa (Latin)" },
        { value: "ha-NE", name: "Hausa (Niger)" },
        { value: "ha-NG", name: "Hausa (Nigeria)" },
        { value: "he", name: "Hebrew" },
        { value: "he-IL", name: "Hebrew (Israel)" },
        { value: "hi", name: "Hindi" },
        { value: "hi-IN", name: "Hindi (India)" },
        { value: "hu", name: "Hungarian" },
        { value: "hu-HU", name: "Hungarian (Hungary)" },
        { value: "is", name: "Icelandic" },
        { value: "is-IS", name: "Icelandic (Iceland)" },
        { value: "ig", name: "Igbo" },
        { value: "ig-NG", name: "Igbo (Nigeria)" },
        { value: "id", name: "Indonesian" },
        { value: "id-ID", name: "Indonesian (Indonesia)" },
        { value: "ga", name: "Irish" },
        { value: "ga-IE", name: "Irish (Ireland)" },
        { value: "it", name: "Italian" },
        { value: "it-IT", name: "Italian (Italy)" },
        { value: "it-SM", name: "Italian (San Marino)" },
        { value: "it-CH", name: "Italian (Switzerland)" },
        { value: "ja", name: "Japanese" },
        { value: "ja-JP", name: "Japanese (Japan)" },
        { value: "kl", name: "Kalaallisut" },
        { value: "kl-GL", name: "Kalaallisut (Greenland)" },
        { value: "kn", name: "Kannada" },
        { value: "kn-IN", name: "Kannada (India)" },
        { value: "ks", name: "Kashmiri" },
        { value: "ks-Arab-IN", name: "Kashmiri (Arabic, India)" },
        { value: "ks-Arab", name: "Kashmiri (Arabic)" },
        { value: "ks-IN", name: "Kashmiri (India)" },
        { value: "kk", name: "Kazakh" },
        { value: "kk-Cyrl-KZ", name: "Kazakh (Cyrillic, Kazakhstan)" },
        { value: "kk-Cyrl", name: "Kazakh (Cyrillic)" },
        { value: "kk-KZ", name: "Kazakh (Kazakhstan)" },
        { value: "km", name: "Khmer" },
        { value: "km-KH", name: "Khmer (Cambodia)" },
        { value: "ki", name: "Kikuyu" },
        { value: "ki-KE", name: "Kikuyu (Kenya)" },
        { value: "rw", name: "Kinyarwanda" },
        { value: "rw-RW", name: "Kinyarwanda (Rwanda)" },
        { value: "ko", name: "Korean" },
        { value: "ko-KP", name: "Korean (North Korea)" },
        { value: "ko-KR", name: "Korean (South Korea)" },
        { value: "ky", name: "Kyrgyz" },
        { value: "ky-Cyrl-KG", name: "Kyrgyz (Cyrillic, Kyrgyzstan)" },
        { value: "ky-Cyrl", name: "Kyrgyz (Cyrillic)" },
        { value: "ky-KG", name: "Kyrgyz (Kyrgyzstan)" },
        { value: "lo", name: "Lao" },
        { value: "lo-LA", name: "Lao (Laos)" },
        { value: "lv", name: "Latvian" },
        { value: "lv-LV", name: "Latvian (Latvia)" },
        { value: "ln", name: "Lingala" },
        { value: "ln-AO", name: "Lingala (Angola)" },
        { value: "ln-CF", name: "Lingala (Central African Republic)" },
        { value: "ln-CG", name: "Lingala (Congo - Brazzaville)" },
        { value: "ln-CD", name: "Lingala (Congo - Kinshasa)" },
        { value: "lt", name: "Lithuanian" },
        { value: "lt-LT", name: "Lithuanian (Lithuania)" },
        { value: "lu", name: "Luba-Katanga" },
        { value: "lu-CD", name: "Luba-Katanga (Congo - Kinshasa)" },
        { value: "lb", name: "Luxembourgish" },
        { value: "lb-LU", name: "Luxembourgish (Luxembourg)" },
        { value: "mk", name: "Macedonian" },
        { value: "mk-MK", name: "Macedonian (Macedonia)" },
        { value: "mg", name: "Malagasy" },
        { value: "mg-MG", name: "Malagasy (Madagascar)" },
        { value: "ms", name: "Malay" },
        { value: "ms-BN", name: "Malay (Brunei)" },
        { value: "ms-Latn-BN", name: "Malay (Latin, Brunei)" },
        { value: "ms-Latn-MY", name: "Malay (Latin, Malaysia)" },
        { value: "ms-Latn-SG", name: "Malay (Latin, Singapore)" },
        { value: "ms-Latn", name: "Malay (Latin)" },
        { value: "ms-MY", name: "Malay (Malaysia)" },
        { value: "ms-SG", name: "Malay (Singapore)" },
        { value: "ml", name: "Malayalam" },
        { value: "ml-IN", name: "Malayalam (India)" },
        { value: "mt", name: "Maltese" },
        { value: "mt-MT", name: "Maltese (Malta)" },
        { value: "gv", name: "Manx" },
        { value: "gv-IM", name: "Manx (Isle of Man)" },
        { value: "mr", name: "Marathi" },
        { value: "mr-IN", name: "Marathi (India)" },
        { value: "mn", name: "Mongolian " },
        {
            value: "mn-Cyrl-MN",
            name: "Mongolian (Cyrillic, Mongolia)",
        },
        { value: "mn-Cyrl", name: "Mongolian (Cyrillic)" },
        { value: "mn-MN", name: "Mongolian (Mongolia)" },
        { value: "ne", name: "Nepali" },
        { value: "ne-IN", name: "Nepali (India)" },
        { value: "ne-NP", name: "Nepali (Nepal)" },
        { value: "nd", name: "North Ndebele" },
        { value: "nd-ZW", name: "North Ndebele (Zimbabwe)" },
        { value: "se", name: "Northern Sami" },
        { value: "se-FI", name: "Northern Sami (Finland)" },
        { value: "se-NO", name: "Northern Sami (Norway)" },
        { value: "se-SE", name: "Northern Sami (Sweden)" },
        { value: "no", name: "Norwegian" },
        { value: "no-NO", name: "Norwegian (Norway)" },
        { value: "nb", name: "Norwegian Bokmål" },
        { value: "nb-NO", name: "Norwegian Bokmål (Norway)" },
        {
            value: "nb-SJ",
            name: "Norwegian Bokmål (Svalbard and Jan Mayen)",
        },
        { value: "nn", name: "Norwegian Nynorsk" },
        { value: "nn-NO", name: "Norwegian Nynorsk (Norway)" },
        { value: "or", name: "Oriya" },
        { value: "or-IN", name: "Oriya (India)" },
        { value: "om", name: "Oromo" },
        { value: "om-ET", name: "Oromo (Ethiopia)" },
        { value: "om-KE", name: "Oromo (Kenya)" },
        { value: "os", name: "Ossetic" },
        { value: "os-GE", name: "Ossetic (Georgia)" },
        { value: "os-RU", name: "Ossetic (Russia) " },
        { value: "ps", name: "Pashto" },
        { value: "ps-AF", name: "Pashto (Afghanistan)" },
        { value: "fa", name: "Persian" },
        { value: "fa-AF", name: "Persian (Afghanistan)" },
        { value: "fa-IR", name: "Persian (Iran)" },
        { value: "pl", name: "Polish" },
        { value: "pl-PL", name: "Polish (Poland)" },
        { value: "pt", name: "Portuguese" },
        { value: "pt-AO", name: "Portuguese (Angola)" },
        { value: "pt-BR", name: "Portuguese (Brazil)" },
        { value: "pt-CV", name: "Portuguese (Cape Verde)" },
        { value: "pt-GW", name: "Portuguese (Guinea-Bissau)" },
        { value: "pt-MO", name: "Portuguese (Macau SAR China)" },
        { value: "pt-MZ", name: "Portuguese (Mozambique)" },
        { value: "pt-PT", name: "Portuguese (Portugal)" },
        { value: "pt-ST", name: "Portuguese (São Tomé and Príncipe)" },
        { value: "pt-TL", name: "Portuguese (Timor-Leste)" },
        { value: "pa", name: "Punjabi" },
        { value: "pa-Arab-PK", name: "Punjabi (Arabic, Pakistan)" },
        { value: "pa-Arab", name: "Punjabi (Arabic)" },
        { value: "pa-Guru-IN", name: "Punjabi (Gurmukhi, India)" },
        { value: "pa-Guru", name: "Punjabi (Gurmukhi)" },
        { value: "pa-IN", name: "Punjabi (India)" },
        { value: "pa-PK", name: "Punjabi (Pakistan)" },
        { value: "qu", name: "Quechua" },
        { value: "qu-BO", name: "Quechua (Bolivia)" },
        { value: "qu-EC", name: "Quechua (Ecuador)" },
        { value: "qu-PE", name: "Quechua (Peru)" },
        { value: "ro", name: "Romanian" },
        { value: "ro-MD", name: "Romanian (Moldova)" },
        { value: "ro-RO", name: "Romanian (Romania)" },
        { value: "rm", name: "Romansh" },
        { value: "rm-CH", name: "Romansh (Switzerland)" },
        { value: "rn", name: "Rundi" },
        { value: "rn-BI", name: "Rundi (Burundi)" },
        { value: "ru", name: "Russian" },
        { value: "ru-BY", name: "Russian (Belarus)" },
        { value: "ru-KZ", name: "Russian (Kazakhstan)" },
        { value: "ru-KG", name: "Russian (Kyrgyzstan)" },
        { value: "ru-MD", name: "Russian (Moldova)" },
        { value: "ru-RU", name: "Russian (Russia)" },
        { value: "ru-UA", name: "Russian (Ukraine)" },
        { value: "sg", name: "Sango" },
        { value: "sg-CF", name: "Sango (Central African Republic)" },
        { value: "gd", name: "Scottish Gaeli" },
        { value: "gd-GB", name: "Scottish Gaelic (United Kingdom)" },
        { value: "sr", name: "Serbian" },
        { value: "sr-BA", name: "Serbian (Bosnia and Herzegovina)" },
        {
            value: "sr-Cyrl-BA",
            name: "Serbian (Cyrillic, Bosnia and Herzegovina)",
        },
        { value: "sr-Cyrl-XK", name: "Serbian (Cyrillic, Kosovo)" },
        {
            value: "sr-Cyrl-ME",
            name: "Serbian (Cyrillic, Montenegro)",
        },
        { value: "sr-Cyrl-RS", name: "Serbian (Cyrillic, Serbia)" },
        { value: "sr-Cyrl", name: "Serbian (Cyrillic)" },
        { value: "sr-XK", name: "Serbian (Kosovo)" },
        {
            value: "sr-Latn-BA",
            name: "Serbian (Latin, Bosnia and Herzegovina)",
        },
        { value: "sr-Latn-XK", name: "Serbian (Latin, Kosovo)" },
        { value: "sr-Latn-ME", name: "Serbian (Latin, Montenegro)" },
        { value: "sr-Latn-RS", name: "Serbian (Latin, Serbia)" },
        { value: "sr-Latn", name: "Serbian (Latin)" },
        { value: "sr-ME", name: "Serbian (Montenegro)" },
        { value: "sr-RS", name: "Serbian (Serbia)" },
        { value: "sh", name: "Serbo-Croatian" },
        { value: "sh-BA", name: "Serbo-Croatian (Bosnia and Herzegovina)" },
        { value: "sn", name: "Shona" },
        { value: "sn-ZW", name: "Shona (Zimbabwe)" },
        { value: "ii", name: "Sichuan Yi" },
        { value: "ii-CN", name: "Sichuan Yi (China)" },
        { value: "si", name: "Sinhala" },
        { value: "si-LK", name: "Sinhala (Sri Lanka)" },
        { value: "sk", name: "Slovak" },
        { value: "sk-SK", name: "Slovak (Slovakia)" },
        { value: "sl", name: "Slovenian" },
        { value: "sl-SI", name: "Slovenian (Slovenia)" },
        { value: "so", name: "Somali" },
        { value: "so-DJ", name: "Somali (Djibouti)" },
        { value: "so-ET", name: "Somali (Ethiopia)" },
        { value: "so-KE", name: "Somali (Kenya)" },
        { value: "so-SO", name: "Somali (Somalia)" },
        { value: "es", name: "Spanish" },
        { value: "es-AR", name: "Spanish (Argentina)" },
        { value: "es-BO", name: "Spanish (Bolivia)" },
        { value: "es-IC", name: "Spanish (Canary Islands)" },
        { value: "es-EA", name: "Spanish (Ceuta and Melilla)" },
        { value: "es-CL", name: "Spanish (Chile)" },
        { value: "es-CO", name: "Spanish (Colombia)" },
        { value: "es-CR", name: "Spanish (Costa Rica)" },
        { value: "es-CU", name: "Spanish (Cuba)" },
        { value: "es-DO", name: "Spanish (Dominican Republic)" },
        { value: "es-EC", name: "Spanish (Ecuador) " },
        { value: "es-SV", name: "Spanish (El Salvador)" },
        { value: "es-GQ", name: "Spanish (Equatorial Guinea)" },
        { value: "es-GT", name: "Spanish (Guatemala)" },
        { value: "es-HN", name: "Spanish (Honduras)" },
        { value: "es-MX", name: "Spanish (Mexico)" },
        { value: "es-NI", name: "Spanish (Nicaragua)" },
        { value: "es-PA", name: "Spanish (Panama)" },
        { value: "es-PY", name: "Spanish (Paraguay)" },
        { value: "es-PE", name: "Spanish (Peru)" },
        { value: "es-PH", name: "Spanish (Philippines)" },
        { value: "es-PR", name: "Spanish (Puerto Rico)" },
        { value: "es-ES", name: "Spanish (Spain)" },
        { value: "es-US", name: "Spanish (United States)" },
        { value: "es-UY", name: "Spanish (Uruguay)" },
        { value: "es-VE", name: "Spanish (Venezuela)" },
        { value: "sw", name: "Swahili" },
        { value: "sw-KE", name: "Swahili (Kenya)" },
        { value: "sw-TZ", name: "Swahili (Tanzania)" },
        { value: "sw-UG", name: "Swahili (Uganda)" },
        { value: "sv", name: "Swedish" },
        { value: "sv-AX", name: "Swedish (Åland Islands)" },
        { value: "sv-FI", name: "Swedish (Finland)" },
        { value: "sv-SE", name: "Swedish (Sweden)" },
        { value: "tl", name: "Tagalog" },
        { value: "tl-PH", name: "Tagalog (Philippines)" },
        { value: "ta", name: "Tamil" },
        { value: "ta-IN", name: "Tamil (India)" },
        { value: "ta-MY", name: "Tamil (Malaysia)" },
        { value: "ta-SG", name: "Tamil (Singapore)" },
        { value: "ta-LK", name: "Tamil (Sri Lanka)" },
        { value: "te", name: "Telugu" },
        { value: "te-IN", name: "Telugu (India)" },
        { value: "th", name: "Thai" },
        { value: "th-TH", name: "Thai (Thailand)" },
        { value: "bo", name: "Tibetan" },
        { value: "bo-CN", name: "Tibetan (China)" },
        { value: "bo-IN", name: "Tibetan (India)" },
        { value: "ti", name: "Tigrinya" },
        { value: "ti-ER", name: "Tigrinya (Eritrea)" },
        { value: "ti-ET", name: "Tigrinya (Ethiopia)" },
        { value: "to", name: "Tongan" },
        { value: "to-TO", name: "Tongan (Tonga)" },
        { value: "tr", name: "Turkish" },
        { value: "tr-CY", name: "Turkish (Cyprus)" },
        { value: "tr-TR", name: "Turkish (Turkey)" },
        { value: "uk", name: "Ukrainian" },
        { value: "uk-UA", name: "Ukrainian (Ukraine)" },
        { value: "ur", name: "Urdu" },
        { value: "ur-IN", name: "Urdu (India)" },
        { value: "ur-PK", name: "Urdu (Pakistan)" },
        { value: "ug", name: "Uyghur" },
        { value: "ug-Arab-CN", name: "Uyghur (Arabic, China)" },
        { value: "ug-Arab", name: "Uyghur (Arabic)" },
        { value: "ug-CN", name: "Uyghur (China)" },
        { value: "uz", name: "Uzbek" },
        { value: "uz-AF", name: "Uzbek (Afghanistan)" },
        { value: "uz-Arab-AF", name: "Uzbek (Arabic, Afghanistan)" },
        { value: "uz-Arab", name: "Uzbek (Arabic)" },
        { value: "uz-Cyrl-UZ", name: "Uzbek (Cyrillic, Uzbekistan)" },
        { value: "uz-Cyrl", name: "Uzbek (Cyrillic)" },
        { value: "uz-Latn-UZ", name: "Uzbek (Latin, Uzbekistan)" },
        { value: "uz-Latn", name: "Uzbek (Latin)" },
        { value: "uz-UZ", name: "Uzbek (Uzbekistan)" },
        { value: "vi", name: "Vietvaluese" },
        { value: "vi-VN", name: "Vietvaluese (Vietnam)" },
        { value: "cy", name: "Welsh" },
        { value: "cy-GB", name: "Welsh (United Kingdom)" },
        { value: "fy", name: "Western Frisian" },
        { value: "fy-NL", name: "Western Frisian (Netherlands)" },
        { value: "yi", name: "Yiddish" },
        { value: "yo", name: "Yoruba" },
        { value: "yo-BJ", name: "Yoruba (Benin)" },
        { value: "yo-NG", name: "Yoruba (Nigeria)" },
        { value: "zu", name: "Zulu" },
        { value: "zu-ZA", name: "Zulu (South Africa)" },
    ];

    let languagesState = useSelector((state) => state.browserConfig.languages);
    let [languagesShow, setLanguagesShow] = useState([...languagesState]);

    const handleChangeLanguages = (e) => {
        let curentLanguages = [...languagesShow];
        let value = e.target.value;
        if (e.target.checked) {
            curentLanguages.push({
                name: value,
                value: "",
            });
        } else {
            curentLanguages = curentLanguages.filter((item) => item.name !== value);
        }
        curentLanguages = fotmatData(curentLanguages);
        setLanguagesShow(curentLanguages);
    };

    const handleSubmitLanguages = (e) => {
        dispatch(handleSetLanguages(languagesShow));
        hide();
    };

    return (
        <div
            className={
                isShowing && modalName.includes("languagesModal")
                    ? "modal fade show d-block"
                    : "modal fade"
            }
            tabIndex="-1"
            id="proxyModal">
            <div
                className="modal-content modal-md h-50 top-50 start-50 translate-middle"
                id="languagesModalContent">
                <button className="close btn-close-modal" onClick={hide}>
                    <em className="icon ni ni-cross"></em>
                </button>
                <div className="modal-header">
                    <h5 className="modal-title">{t('Languages List')}</h5>
                </div>

                <div className="modal-body d-flex flex-column justify-content-space-between overflow-hidden gap-05">
                    <div className="group-languages overflow-y-scroll d-flex flex-wrap card-bordered p-1">
                        {listLanguages.map((languages, index) => (
                            <div
                                key={index}
                                className="custom-control custom-checkbox w-25 mb-1">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id={`languages-modal ${index}`}
                                    value={languages.value}
                                    data-country={languages.name}
                                    defaultChecked={languagesShow.find(
                                        (item) => item.name === languages.value
                                    )}
                                    disabled={((languagesShow.find(
                                        (item) => item.name === languages.value
                                    ) ? false : true) && languagesShow.length >= 10) ? 'disable' : ''}
                                    name="checkboxLanguages"
                                    onChange={handleChangeLanguages}
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor={`languages-modal ${index}`}>
                                    {languages.name}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="group-languages-detail">
                        <input
                            type="text"
                            className="form-control"
                            disabled
                            id="languages-show"
                            placeholder="Languages selected"
                            value={languagesShow.map((item, index) => {
                                return `${item.name}${item.value != 1 ? ";q=" + item.value : ""
                                    }`;
                            })}
                        />
                    </div>
                    {languagesShow.length < 10 ? (
                        <p>{t('Up to 10 languages.')}</p>
                    ) : (
                        <p className="text-danger">{t('Exceeded the 10 language limit.')}</p>
                    )}
                </div>
                <div className="modal-footer bg-light">
                    <button
                        disabled={languagesShow.length >= 10 ? "disable" : ""}
                        className="btn btn-dim btn-outline-primary"
                        onClick={handleSubmitLanguages}>
                        {t('Submit')}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default memo(ModalListLanguages);
