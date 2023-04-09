import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ unique: true, name: 'discord_id' })
  discordId: string;

  @Prop({ name: 'access_token' })
  accessToken: string;

  @Prop({ name: 'refresh_token' })
  refreshToken: string;

  @Prop()
  username: string;

  @Prop()
  discriminator: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
