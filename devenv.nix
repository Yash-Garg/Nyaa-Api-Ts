{pkgs, ...}: {
  languages.typescript.enable = true;

  packages = [pkgs.nodejs-18_x];

  enterShell = ''
    node --version
  '';
}
