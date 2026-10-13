-- Workspace por defecto mientras no haya auth ni multi-agencia.
INSERT INTO "workspaces" ("name", "slug") VALUES ('Mi agencia', 'mi-agencia') ON CONFLICT ("slug") DO NOTHING;
