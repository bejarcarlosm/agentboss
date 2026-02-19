-- Agregar campos del formulario de diagnostico a la tabla leads existente
ALTER TABLE leads ADD COLUMN IF NOT EXISTS company_name text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS website text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS project_description text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS role_type text;
