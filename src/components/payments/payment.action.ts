import { Request, Response } from "express";
import Flutterwave from "flutterwave-node-v3";
import open from "open";
// const Flutterwave = await import('flutterwave-node-v3');
// const open = require("open");

const flw = new Flutterwave(
  "FLWPUBK_TEST-3606489c2def3eb8faf2c569c36939b3-X",
  "FLWSECK_TEST-ac0a3d50f7a8eb83895d738322969fce-X"
);

const chargeCard = async (req: Request, res: Response) => {
  try {
    const data = await flw.Charge.card(req.body);

    if (data.meta.authorization.mode === "pin") {
      let payload_copy = req.body;

      payload_copy.authorization = {
        mode: "pin",
        fields: ["pin"],
        pin: req.body.pin,
      };

      const reCallCharge = await flw.Charge.card(payload_copy);

      const callValidate = await flw.Charge.validate({
        otp: req.body.otp,
        flw_ref: reCallCharge.data.flw_ref,
      });

      console.log({ callValidate });
    }

    if (data.meta.authorization.mode === "redirect") {
      const url = data.meta.authorization.redirect;
      open(url);
    }

    console.log({ data });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export default chargeCard;
