const fs = require("fs");
const path = require("path");

// Atualize esses caminhos conforme necessário
const buildGradlePath = path.join(
  __dirname,
  "node_modules/@react-native-community/netinfo/android/build.gradle"
);
const androidManifestPath = path.join(
  __dirname,
  "node_modules/@react-native-community/netinfo/android/src/main/AndroidManifest.xml"
);

// Função para ler o atributo package do AndroidManifest.xml
function getPackageFromManifest() {
  return new Promise((resolve, reject) => {
    fs.readFile(androidManifestPath, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const match = data.match(/package\s*=\s*"(.+?)"/);
      if (match && match[1]) {
        resolve(match[1]);
      } else {
        reject("Atributo package não encontrado no AndroidManifest.xml.");
      }
    });
  });
}

// Função para inserir o namespace no build.gradle
function insertNamespace(namespace) {
  fs.readFile(buildGradlePath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    if (!data.includes("namespace")) {
      const result = data.replace(
        /android\s*{/,
        `android {\n  namespace "${namespace}"`
      );

      fs.writeFile(buildGradlePath, result, "utf8", (err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(
          `Namespace '${namespace}' inserido com sucesso no build.gradle.`
        );
      });
    } else {
      console.log("Namespace já está definido no build.gradle.");
    }
  });
}

// Executar as funções
getPackageFromManifest()
  .then(insertNamespace)
  .catch((error) => console.log(error));
