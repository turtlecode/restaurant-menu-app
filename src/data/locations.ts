import { LocationHierarchy } from '../types';

export const LOCATION_DATA: LocationHierarchy = {
  cities: [
    {
      name: 'İstanbul',
      districts: [
        {
          name: 'Kadıköy',
          neighborhoods: [
            {
              name: 'Moda',
              streets: ['Caferağa Sokak', 'Moda Caddesi', 'Şair Nefi Sokak', 'Ferit Tek Sokak'],
            },
            {
              name: 'Caddebostan',
              streets: ['Bağdat Caddesi', 'İskele Sokak', 'Haldun Taner Sokak'],
            },
            {
              name: 'Acıbadem',
              streets: ['Acıbadem Caddesi', 'Çeçen Sokak', 'Sarayardı Caddesi'],
            },
          ],
        },
        {
          name: 'Beşiktaş',
          neighborhoods: [
            {
              name: 'Bebek',
              streets: ['Cevdet Paşa Caddesi', 'Bebek Yokuşu', 'Manolya Sokak'],
            },
            {
              name: 'Ortaköy',
              streets: ['Muallim Naci Caddesi', 'Dereboyu Caddesi', 'Mecidiye Köprüsü Sokak'],
            },
            {
              name: 'Sinanpaşa',
              streets: ['Şair Nedim Caddesi', 'Köyiçi Meydanı', 'Akmaz Çeşme Sokak'],
            },
          ],
        },
        {
          name: 'Şişli',
          neighborhoods: [
            {
              name: 'Nişantaşı',
              streets: ['Teşvikiye Caddesi', 'Abdi İpekçi Caddesi', 'Mim Kemal Öke Caddesi'],
            },
            {
              name: 'Mecidiyeköy',
              streets: ['Büyükdere Caddesi', 'Ortaklar Caddesi', 'Kervangeçmez Sokak'],
            },
          ],
        },
        {
          name: 'Üsküdar',
          neighborhoods: [
            {
              name: 'Çengelköy',
              streets: ['Çengelköy Caddesi', 'Havuzbaşı Sokak', 'Kuleli Caddesi'],
            },
            {
              name: 'Kuzguncuk',
              streets: ['İcadiye Caddesi', 'Perihan Abla Sokak'],
            },
          ],
        },
      ],
    },
    {
      name: 'Ankara',
      districts: [
        {
          name: 'Çankaya',
          neighborhoods: [
            {
              name: 'Kızılay',
              streets: ['Tunalı Hilmi Caddesi', 'Karanfil Sokak', 'Yüksel Caddesi', 'Meşrutiyet Caddesi'],
            },
            {
              name: 'Bahçelievler',
              streets: ['7. Cadde', 'Aşkabat Caddesi', 'Kazakistan Caddesi'],
            },
            {
              name: 'Gaziosmanpaşa',
              streets: ['Filistin Caddesi', 'Arjantin Caddesi', 'Uğur Mumcu Caddesi'],
            },
          ],
        },
        {
          name: 'Yenimahalle',
          neighborhoods: [
            {
              name: 'Batıkent',
              streets: ['Cengiz Aytmatov Caddesi', 'Meydan Sokak'],
            },
          ],
        },
      ],
    },
    {
      name: 'İzmir',
      districts: [
        {
          name: 'Konak',
          neighborhoods: [
            {
              name: 'Alsancak',
              streets: ['Kıbrıs Şehitleri Caddesi', 'Plevne Bulvarı', 'Gül Sokak', 'Kültür Sokak'],
            },
          ],
        },
        {
          name: 'Karşıyaka',
          neighborhoods: [
            {
              name: 'Bostanlı',
              streets: ['Cemal Gürsel Caddesi', '1807 Sokak', 'Bestekar Sadi Hoşses Sokak'],
            },
          ],
        },
      ],
    },
    {
      name: 'Bursa',
      districts: [
        {
          name: 'Osmangazi',
          neighborhoods: [
            {
              name: 'Heykel',
              streets: ['Atatürk Caddesi', 'Kapalı Çarşı Yanı', 'Gaziakdemir Sokak'],
            },
          ],
        },
        {
          name: 'Nilüfer',
          neighborhoods: [
            {
              name: 'Fethiye',
              streets: ['FSM Bulvarı', 'Ata Bulvarı', 'Işık Sokak'],
            },
          ],
        },
      ],
    },
  ],
};
