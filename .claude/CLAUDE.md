# PRD — Pokémon Kart Uygulaması

## 1. Proje Özeti

PokéAPI kullanarak Pokémon bilgilerini kart formatında gösteren, sade bir React uygulaması. Kullanıcı bir arama kutusuyla istediği Pokémon'u isim veya ID ile arar; sonuç kart bileşeni olarak render edilir.

---

## 2. Teknik Kısıtlar

| Parametre | Değer |
|---|---|
| Framework | React (functional components) |
| Veri Kaynağı | `https://pokeapi.co/api/v2/` |
| useState kullanımı | **4 adet** |
| useEffect kullanımı | **1 adet** |
| Component sayısı | **3 adet** |
| Stil | Tamamen geliştirici tarafından belirlenir (CSS/Tailwind serbest) |

---

## 3. Component Mimarisi

```
App
├── SearchBar
└── PokemonCard
```

### 3.1 `App` (root component)
Ana state yönetimi ve useEffect burada yaşar. Diğer iki component'i render eder.

### 3.2 `SearchBar`
- Arama inputu ve submit butonu içerir.
- Kullanıcıdan Pokémon adı veya ID alır.
- `onSearch(query)` prop'u ile App'e değeri iletir.

### 3.3 `PokemonCard`
- `pokemon` prop'u alır.
- Kart üzerinde şunları gösterir:
  - **Sprite** — resmi (front_default)
  - **Tip(ler)** — `types` alanından (örn. fire, flying)
  - **Yetenekler** — `abilities` alanından (ability isimleri)
- Loading ve hata durumlarını kendi içinde değil, App üzerinden prop olarak alır.

---

## 4. State Tanımları (4 adet)

| # | State Adı | Tip | Açıklama |
|---|---|---|---|
| 1 | `query` | `string` | Arama kutusundaki anlık input değeri |
| 2 | `searchTerm` | `string` | Submit edilen, API'ye gönderilecek arama terimi |
| 3 | `pokemon` | `object \| null` | API'den dönen Pokémon verisi |
| 4 | `status` | `'idle' \| 'loading' \| 'success' \| 'error'` | İstek durumu |

> `query` ile `searchTerm` ayrılmasının sebebi: input her değiştiğinde API çağrısı yapılmaması, yalnızca submit anında tetiklenmesi.

---

## 5. useEffect Tanımı (1 adet)

**Bağımlılık:** `[searchTerm]`

**Davranış:**
1. `searchTerm` boşsa çalışmaz (early return).
2. `status` → `'loading'` yapar.
3. `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}` adresine `fetch` atar.
4. Başarılıysa `pokemon` state'ini doldurur, `status` → `'success'`.
5. Hata varsa (404 dahil) `status` → `'error'`, `pokemon` → `null`.

---

## 6. Veri Akışı

```
Kullanıcı yazar  →  query güncellenir
Kullanıcı submit eder  →  searchTerm güncellenir
searchTerm değişir  →  useEffect tetiklenir  →  API çağrısı
API cevabı  →  pokemon & status güncellenir
pokemon prop'u  →  PokemonCard render edilir
```

---

## 7. API Kullanımı

**Endpoint:**
```
GET https://pokeapi.co/api/v2/pokemon/{name_or_id}
```

**Kullanılacak alanlar:**

```js
pokemon.name              // Pokémon adı
pokemon.id                // Pokémon numarası
pokemon.sprites.front_default  // Sprite URL
pokemon.types[].type.name      // Tip isimleri
pokemon.abilities[].ability.name  // Yetenek isimleri
```

---

## 8. Kullanıcı Senaryoları

### Senaryo 1 — Başarılı arama
1. Kullanıcı input'a `"pikachu"` yazar.
2. Submit butonuna basar.
3. Loading göstergesi belirir.
4. Pikachu kartı: sprite, tipler (electric), yetenekler ile görünür.

### Senaryo 2 — Geçersiz isim
1. Kullanıcı `"saçmapikachu"` yazar ve submit eder.
2. API 404 döner.
3. Kart yerine hata mesajı gösterilir.

### Senaryo 3 — ID ile arama
1. Kullanıcı `"25"` yazar (Pikachu'nun ID'si).
2. Senaryo 1 ile aynı sonuç.

---

## 9. Kapsam Dışı (Bu PRD'de yok)

- Sayfalandırma / liste görünümü
- Favoriler / yerel depolama
- Karşılaştırma ekranı
- Ses / animasyon
- Authentication