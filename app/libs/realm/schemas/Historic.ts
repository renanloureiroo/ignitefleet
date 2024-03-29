import { Realm } from "@realm/react";
import { CoordsSchemaProps } from "./Coords";

type GenerateProps = {
  user_id: string;
  license_plate: string;
  description: string;
  coords: CoordsSchemaProps[];
};

export class Historic extends Realm.Object<Historic> {
  _id!: string;
  user_id!: string;
  license_plate!: string;
  description!: string;
  status!: string;
  coords!: CoordsSchemaProps[];
  created_at!: Date;
  updated_at!: Date;

  static generate({
    description,
    license_plate,
    user_id,
    coords,
  }: GenerateProps) {
    return {
      _id: new Realm.BSON.UUID(),
      user_id,
      license_plate,
      description,
      coords,
      status: "departure",
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  static schema: Realm.ObjectSchema = {
    name: "Historic",
    primaryKey: "_id",
    properties: {
      _id: "uuid",
      user_id: {
        type: "string",
        indexed: true,
      },
      license_plate: "string",
      description: "string",
      status: "string",
      coords: {
        type: "list",
        objectType: "Coords",
      },
      created_at: "date",
      updated_at: "date",
    },
  };
}
