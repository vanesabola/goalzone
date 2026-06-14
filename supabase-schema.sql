-- Jalankan di Supabase SQL Editor
create table if not exists articles (
  id bigserial primary key,
  title text not null,
  excerpt text default '',
  content text default '',
  category text default 'Umum',
  status text default 'draft' check (status in ('published','draft')),
  author text default 'Admin',
  image text default '',
  views text default '0',
  is_world_cup boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table articles enable row level security;

drop policy if exists "Public read published" on articles;
drop policy if exists "Service role full access" on articles;

create policy "Public read published" on articles for select using (status = 'published');
create policy "Service role full access" on articles for all using (true) with check (true);

insert into articles (title, excerpt, content, category, status, author, views, is_world_cup) values
('Timnas Indonesia Ciptakan Sejarah: Lolos ke Babak 16 Besar Piala Dunia 2026!', 'Garuda Muda mengalahkan Korea Selatan 2-1 di matchday terakhir Grup C.', 'JAKARTA — Sebuah momen bersejarah tercipta di MetLife Stadium. Timnas Indonesia memastikan tiket ke babak 16 besar Piala Dunia 2026 dengan kemenangan dramatis 2-1 atas Korea Selatan. Gol penentu dicetak Marselino Ferdinan pada menit ke-87.', 'Piala Dunia', 'published', 'Reza Pratama', '48.2K', true),
('Haaland Cetak Brace, City ke Final UCL Keempat Berturut-turut', 'Erling Haaland kembali membuktikan dirinya sebagai mesin gol terbaik Eropa.', 'MANCHESTER — Man City kembali melaju ke final Liga Champions Eropa setelah Erling Haaland mencetak dua gol penting saat mengalahkan Real Madrid 4-1 di Etihad Stadium.', 'UCL', 'published', 'Dian Saputra', '24K', false),
('Persib Bandung Kokoh di Puncak Klasemen Setelah Gasak Arema 3-0', 'Persib Bandung makin kuat di puncak klasemen Liga 1.', 'BANDUNG — Maung Bandung tampil ganas dan mendominasi Arema FC dengan skor telak 3-0.', 'Liga 1', 'published', 'Budi Santoso', '21K', false),
('Brasil Bantai Bolivia 3-0, Vinicius Jr Cetak Brace Spektakuler', 'Brasil tampil dominan dan Vinicius Jr menjadi bintang dengan dua gol indah.', 'LOS ANGELES — Brasil menampilkan permainan terbaik mereka di Piala Dunia 2026 dengan membantai Bolivia 3-0.', 'Piala Dunia', 'published', 'Mario Karta', '38K', true);
