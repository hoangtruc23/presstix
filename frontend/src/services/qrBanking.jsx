const bankID = 970422;
const accountName = 'HOANG BAO TRUC';
const acountNO = 1000140190323;
const template = 'compact2';

const baseQRBanking = (amount,description) => {
    const url = `https://img.vietqr.io/image/${bankID}-${acountNO}-${template}.png?amount=${amount}&addInfo=${description}&accountName=${accountName};`
    return url;
    
}

export default baseQRBanking;