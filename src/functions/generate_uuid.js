function generate_uuid() {
          
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 16; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
  
 console.log(generate_uuid())