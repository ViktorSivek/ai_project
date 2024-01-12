import xml2js from 'xml2js';

export type MEVTItem = {
    MTXT: string; // The text inside the MTXT tag
};

export const parseXmlAndExtractTag = async (xmlData: string): Promise<MEVTItem[]> => {
    const parser = new xml2js.Parser({ explicitArray: false });
    let result;
    try {
        result = await parser.parseStringPromise(xmlData);
    } catch (error) {
        console.error("Error parsing XML:", error);
        return [];
    }

    if (!result?.DInfo?.XML) {
        console.error("Unexpected XML structure:", result);
        return [];
    }

    const xmlArray = Array.isArray(result.DInfo.XML) ? result.DInfo.XML : [result.DInfo.XML];
    const mevtItems: MEVTItem[] = [];

    xmlArray.forEach((xmlEntry: any) => {
        if (xmlEntry?.DOC?.MJD?.MSG) {
            const msgs = Array.isArray(xmlEntry.DOC.MJD.MSG) ? xmlEntry.DOC.MJD.MSG : [xmlEntry.DOC.MJD.MSG];
            msgs.forEach((msg: any) => {
                if (msg?.MTXT?._) {
                    mevtItems.push({ MTXT: msg.MTXT._ });
                }
            });
        }
    });

    return mevtItems;
};

