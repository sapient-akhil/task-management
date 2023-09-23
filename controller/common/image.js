const path = require('path');
const fs = require('fs');
const createError = require('http-errors');
const commonUploadFunction = require(`../../helper/fileUploadHelper`)

// THIS IS SUPERADMIN, ADMIN AND TRAINER PROFILE PHOTO UPLOAD AND UPDATE TIME OLD PHOTO DELETE FUNCTIO.

// function uploadProfilePhoto(req, res, profilePhoto) {

//     if (req.files && req.files.profilePhoto) {
//         let holderArray = [];
//         if (profilePhoto) {
//             profilePhoto.forEach((imagePath) => {
//                 fs.unlink(imagePath, (err) => {
//                     if (err) {
//                         console.error(`Error deleting ${imagePath}:`, err);
//                     } else {
//                         console.log(`Deleted ${imagePath}`);
//                     }
//                 });
//             });
//         }
//         const files = Array.isArray(req.files.profilePhoto) ? req.files.profilePhoto : [req.files.profilePhoto];
//         files.forEach(file => {
//             // const filePath = path.join(__dirname, "../../uploads", `${Date.now() + '_' + file.name}`);
//             const fileName = `${Date.now()}_${file.name}`;
//             const filePath = path.join("uploads", fileName);
//             if (!filePath) {
//                 throw createError.NotFound("Check the path when an image is uploaded.");
//             }

//             console.log("Generated filePath:", filePath);

//             file.mv(filePath, err => {
//                 if (err) {
//                     return res.status(500).send(err);
//                 }
//             });
//             holderArray.push(filePath);
//         });
//         return holderArray
//     }
// }

module.exports = {
    uploadImage: async (req, res) => {
        try {
            const originalData = req.body.data;
            const image = req.files?.image;
            const path = "uploads/";
            console.log("data : ", image);
            // const log = await commonFunction.saveLogToFile(`\n file Info : ${image}`);
            if (!image) {
                return res.json({
                    status: false,
                    message: "A images required. Please try again.",
                });
            }
            const uploadToAWS = await commonUploadFunction.uploadMaterialToAWS(
                image,
                path
            );
            // console.log("uploadToAWS : ",uploadToAWS)
            // console.log(fileData);
            if (uploadToAWS.status) {
                // const cipherText = await commonFunction.encode(uploadToAWS.data);
                return res.json({
                    status: true,
                    message: "An Image added successfully.",
                    data: uploadToAWS.data,
                });
            } else {
                return res.json({
                    status: false,
                    message: uploadToAWS.message,
                });
            }
        } catch (Err) {
            console.log(Err);
            return res.json({
                status: false,
                message: "Something is wrong in upload Image.Please try again.",
                error: Err,
            });
        }
    },
};