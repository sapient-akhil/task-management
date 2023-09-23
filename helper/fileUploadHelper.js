
const randomstring = require("randomstring")
const limit = 20;
const AWS = require("aws-sdk");
const baseUrl = "task-management";

module.exports.uploadMaterialToAWS = (fileData, path) => {
    return new Promise((resolve) => {
        const acceptFiles = [
            "image/svg",
            "image/svg+xml",
            "image/png",
            "image/x-citrix-png",
            "image/x-png",
            "image/jpeg",
            "image/webp",
            "image/x-citrix-jpeg",
            "image/bmp",
            "application/pdf"
        ];
        const allowedExtension = ["png", "jpg", "jpeg", "svg"];
        const fileExt = fileData.name
            .split(".")
        [fileData.name.split(".").length - 1].toLowerCase();
        // var fileName = fileData.name
        const contentType = fileData.mimetype;
        const ContentEncoding = fileData.encoding;
        const fileSize = fileData.size;
        const fileNameAWS =
            randomstring.generate({ length: 20, charset: "numeric" }) +
            "." +
            fileData.name.split(" ").join("-");
        console.log(fileSize)
        const sizeLimit = limit * 1024 * 1024;
        console.log(sizeLimit);
        if (fileSize > sizeLimit)
            return resolve({
                status: false,
                message: "File size cannot exceed 2MB.",
            });
        if (
            !acceptFiles.includes(contentType) ||
            !allowedExtension.includes(fileExt)
        )
            return resolve({
                status: false,
                message:
                    "Please upload a supported image format, such as *.png, *.svg, *.jpg, *.jpeg, *.pdf"
            });
        const awsConfig = {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
            region: process.env.AWS_S3_REGION,
        };
        AWS.config.update(awsConfig);
        const awsKey = baseUrl + path + fileNameAWS;
        const s3 = new AWS.S3();
        const fileContent = Buffer.from(fileData.data, "binary");
        // Setting up S3 upload parameters
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: awsKey, // File name you want to save as in S3
            Body: fileContent,
            ContentEncoding: ContentEncoding,
            ContentType: contentType,
        };
        s3.upload(params, function (err, data) {
            if (err)
                return resolve({
                    status: false,
                    message: "Error uploading image on s3.",
                });
            return resolve({ status: true, data: data.Location });
        });
    });
};