-- Habilitar extensión pgcron para backups programados
create extension if not exists pg_cron;

-- Crear esquema para backups
create schema if not exists backup;

-- Función para realizar backup
create or replace function backup.create_products_backup()
returns void as $$
begin
  insert into backup.products_history
  select *, current_timestamp as backup_time
  from public.products;
end;
$$ language plpgsql;

-- Programar backup diario a las 3 AM UTC
select cron.schedule(
  'daily-products-backup',
  '0 3 * * *',
  'select backup.create_products_backup()'
);

-- Tabla para almacenar historial
create table if not exists backup.products_history (
  like public.products including all,
  backup_time timestamp with time zone not null
);

-- Índice para búsquedas eficientes en backups
create index idx_products_history_backup_time 
on backup.products_history(backup_time);