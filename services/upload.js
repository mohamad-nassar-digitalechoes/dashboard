const sharp = require("sharp");
class uploadService {
  static async resize(req, res) {
    const file = req.file.filename.split(".");
    const filename = file[0];
    const extension = file[1];
    const convert = sharp("./uploads/" + req.file.filename);
    if (req.body.width)
      convert.resize({
        fit: "fill",
		width: parseInt(req.body.width)
      });
	  if (req.body.height)
      convert.resize( {
        fit: "fill",
		height: parseInt(req.body.height)
      });
      convert.png()
	  convert.toBuffer()
	  const filenameafterconvert=filename + "-resize." + extension;
      convert.toFile("./uploads/" + filenameafterconvert)
      .then((data) => {
		return res.status(200).json({
          msg: "Image has been updated successfully",
		  file: filenameafterconvert
        });
      })
      .catch((err) => {
        return res.status(500).json({
          msg: err,
        });
      });
  }
}
module.exports = uploadService;
