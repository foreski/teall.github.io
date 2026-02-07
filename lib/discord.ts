export interface DiscordUser {
  id: string;
  username: string;
  globalName: string | null;
  avatar: string | null;
  discriminator: string;
}

export interface Session {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: DiscordUser;
}

export interface DiscordGuild {
  id: string;
  name: string;
  icon: string | null;
  banner?: string | null;
  owner: boolean;
  permissions: string;
}

export function getAvatarUrl(user: DiscordUser): string {
  if (user.avatar) {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
  }
  // Default avatar based on discriminator or user id
  const defaultIndex =
    user.discriminator === "0"
      ? (BigInt(user.id) >> BigInt(22)) % BigInt(6)
      : Number(user.discriminator) % 5;
  return `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`;
}

export function getGuildIconUrl(guild: DiscordGuild): string {
  if (guild.icon) {
    return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`;
  }
  return "";
}

export function getGuildBannerUrl(guild: DiscordGuild): string {
  if (guild.banner) {
    return `https://cdn.discordapp.com/banners/${guild.id}/${guild.banner}.png`;
  }
  return "";
}

// Check if user has admin permissions in a guild
// Permission bit 0x8 (8) is Administrator
// Permission bit 0x20 (32) is Manage Server
export function hasAdminPermissions(permissions: string): boolean {
  const perms = BigInt(permissions);
  const ADMINISTRATOR = BigInt(0x8);
  const MANAGE_GUILD = BigInt(0x20);
  return (perms & ADMINISTRATOR) === ADMINISTRATOR || (perms & MANAGE_GUILD) === MANAGE_GUILD;
}
