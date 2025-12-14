import React from "react";
import * as Icons from "../constants/react-icons";
import { type IconType } from "react-icons";

const normalizeIconName = (name: string): string => {
  if (!name) return "";
  return name.toLowerCase().replace(/\s+/g, "").replace(/[.-_]/g, "");
};

const iconMap: Record<string, IconType> = {
  react: Icons.ReactjsIcon,
  node: Icons.NodejsIcon,
  tailwind: Icons.TailwindCssIcon,
  jwt: Icons.JsonwebtokensIcon,
  mongo: Icons.MongodbIcon,
  postgres: Icons.PostgresqlIcon,
  kube: Icons.KubernetesIcon,
  reactnative: Icons.ReactNativeIcon,
  kafka: Icons.ApachekafkaIcon,
  photoshop: Icons.AdobephotoshopIcon,
  aftereffects: Icons.AdobeaftereffectsIcon,
  illustrator: Icons.AdobeillustratorIcon,
  premiere: Icons.AdobepremiereproIcon,

  // Normalized names
  reactjs: Icons.ReactjsIcon,
  nodejs: Icons.NodejsIcon,
  sass: Icons.SassIcon,
  java: Icons.JavaIcon,
  html: Icons.HtmlIcon,
  html5: Icons.HtmlIcon,
  docker: Icons.DockerIcon,
  aws: Icons.AwsIcon,
  google: Icons.GoogleIcon,
  markdown: Icons.MarkdownIcon,
  redux: Icons.ReduxIcon,
  gatsby: Icons.GatsbyIcon,
  graphql: Icons.GraphqlIcon,
  prisma: Icons.PrismaIcon,
  drizzle: Icons.DrizzleIcon,
  mongodb: Icons.MongodbIcon,
  kubernetes: Icons.KubernetesIcon,
  vercel: Icons.VercelIcon,
  nestjs: Icons.NestjsIcon,
  reactrouter: Icons.ReactrouterIcon,
  shadcnui: Icons.ShadcnuiIcon,
  reacthookform: Icons.ReacthookformIcon,
  socketio: Icons.SocketdotioIcon,
  socketdotio: Icons.SocketdotioIcon,
  reactquery: Icons.ReactqueryIcon,
  axios: Icons.AxiosIcon,
  jest: Icons.JestIcon,
  vitest: Icons.VitestIcon,
  cypress: Icons.CypressIcon,
  eslint: Icons.EslintIcon,
  angular: Icons.AngularjsIcon,
  angularjs: Icons.AngularjsIcon,
  shadcn: Icons.ShadcnuiIcon,
  prettier: Icons.PrettierIcon,
  turborepo: Icons.TurborepoIcon,
  nx: Icons.NxIcon,
  nginx: Icons.NginxIcon,
  tauri: Icons.TauriIcon,
  jsonwebtokens: Icons.JsonwebtokensIcon,
  clerk: Icons.ClerkIcon,
  prometheus: Icons.PrometheusIcon,
  cplusplus: Icons.CplusplusIcon,
  unity: Icons.UnityIcon,
  blender: Icons.BlenderIcon,
  adobephotoshop: Icons.AdobephotoshopIcon,
  adobeaftereffects: Icons.AdobeaftereffectsIcon,
  adobeillustrator: Icons.AdobeillustratorIcon,
  adobepremierepro: Icons.AdobepremiereproIcon,
  figma: Icons.FigmaIcon,
  googlesheets: Icons.GooglesheetsIcon,
  googledocs: Icons.GoogledocsIcon,
  mongoose: Icons.MongooseIcon,
  postgresql: Icons.PostgresqlIcon,
  electron: Icons.ElectronIcon,
  rust: Icons.RustIcon,
  fastify: Icons.FastifyIcon,
  jenkins: Icons.JenkinsIcon,
  heroku: Icons.HerokuIcon,
  netlify: Icons.NetlifyIcon,
  githubactions: Icons.GithubactionsIcon,
  digitalocean: Icons.DigitaloceanIcon,
  swagger: Icons.SwaggerIcon,
  planetscale: Icons.PlanetscaleIcon,
  apachekafka: Icons.ApachekafkaIcon,
  rabbitmq: Icons.RabbitmqIcon,
  pnpm: Icons.PnpmIcon,
  grafana: Icons.GrafanaIcon,
  npm: Icons.NpmIcon,
  yarn: Icons.YarnIcon,
  deno: Icons.DenoIcon,
  bun: Icons.BunIcon,
  nodemon: Icons.NodemonIcon,
  expo: Icons.ExpoIcon,
  externallink: Icons.ExternalLinkIcon,
  github: Icons.GithubIcon,
  gitlab: Icons.GitlabIcon,
  bootstrap: Icons.BootstrapIcon,
  javascript: Icons.JavascriptIcon,
  nextjs: Icons.NextJsIcon,
  tailwindcss: Icons.TailwindCssIcon,
  supabase: Icons.SupabaseIcon,
  redis: Icons.RedisIcon,
  azure: Icons.AzureIcon,
  typescript: Icons.TypescriptIcon,
  django: Icons.DjangoIcon,
  firebase: Icons.FirebaseIcon,
  vite: Icons.ViteIcon,
  threejs: Icons.ThreejsIcon,
  python: Icons.PythonIcon,
  dotnet: Icons.DotNetIcon,
  springboot: Icons.SpringBootIcon,
  css: Icons.CssIcon,
  css3: Icons.CssIcon,
  mysql: Icons.MysqlIcon,
  framer: Icons.FramerIcon,
  golang: Icons.GolangIcon,
};

interface GetIconProps {
  name: string;
  size?: number;
  className?: string;
}

export const GetIcon = ({
  name,
  size = 20,
  className,
}: GetIconProps): React.ReactElement | null => {
  const normalizedName = normalizeIconName(name);
  const IconComponent = iconMap[normalizedName];

  if (!IconComponent) {
    console.warn(
      `Icon "${name}" (normalized to "${normalizedName}") not found in iconMap.`
    );
    return null;
  }

  return <IconComponent size={size} className={className} />;
};
