---
date: 2023-12-06

tags:
    - "🇹🇷 Turkish"

comments: true
---

# Benim Klavyem Benim Tuşlarım

Linux sistemler için geliştirilmiş keyd yazılımıyla klavyenizdeki tuşları nasıl remap
edilebileceğini anlatıyorum.

<!-- more -->

İmleç (cursor/mouse) ile yapılan işlemlerin bir kısmını aslında klavye üzerinden çok daha kolay ve
efektif bir şekilde yapılabildiğini biliyorsunuzdur. En basit örnek olan bir metin editöründen
imlecin yanındaki bir metni kopyalamaya bakalım:

Klavye kullanarak:

1. Shift + Ok tuşlarıyla metni seç.
2. Ctrl + c ile metni kopyala.

Mouse kullanarak:

1. Elini klavyeden kaldır ve mouse’a götür.
2. Mouse’a basılı tutarak istediğin metni seç.
3. Mouse ile toolbar’a git ve “Kopyala” butonuna tıkla.
4. Elini mouse’tan çek ve klavyeye geri dön. (Sonuçta yazı yazmaya devam edeceğiz.)

Görüldüğü üzere mouse kullandığımız zaman klavyeye oranla daha fazla iş yapmamız gerekiyor. Mouse’u
hareket ettirmek ve toolbar’dan kopyala butonuna tıklamaktan (2. ve 3. adım) ziyade benim mouse veya
touchpad kullanırken hoşuma gitmeyen asıl nokta elimi klavyeden kaldırıp mouse’a götürmek (1. ve 4.
adım) oluyor çünkü en çok zaman ve enerji isteyen adımlar bunlar.

Tamam, klavye kullanmanın bazı durumlarda mouse kullanmaya oranla daha efektif olduğunu zaten
biliyorduk ve yukarıdaki örnekle pekiştirmiş olduk. Peki bu klavye kullanımını daha da efektif hale
getirmemiz mümkün mü? Çevremden gözlemlediğim kadarıyla çoğu insan klavyeyi 4 parmak (2 sol el
parmağı, 2 sağ el parmağı) ile kullanıyor, klavyede aktif olarak kullandığınız parmak sayısını 10’a
çıkarıp touch typing becerisi kazandığınızda çok daha hızlı ve hatasız yazı yazarak büyük bir zaman
kazancı edinebilirsiniz.

> Touch typing öğrenmek istiyorsanız öğrenim sürecinde kullanabileceğiniz siteleri anlattığım
[yazıma](/blog/2021/10/22/touch-typing-tavsiyeleri/) bakabilirsiniz.

Ancak touch typing’in de ötesi var -hatta touch typing sadece bir başlangıç 😄-. Siz de benim gibi
hatrı sayılır bir süreyi bilgisayar başında geçiyorsanız touch typing becerisi ve bilmem kaç wpm
yazmak sizi durduramayacak ve işlerinizi daha da hızlandırmanın bir yolunu arayacaksınız.
Kullandığınız uygulamalarda onlarca kısayol ezberleyecek, masaüstü ortamınıza yeni kısayollar
ekleyeceksiniz. Bu yazının konusu olan klavyenizdeki tuşların yerini değiştirme isteği de içinizdeki
bu dürtünün bir sonucu olarak ortaya çıkacak ve klavyenizi özelleştirmenin yollarını arayacaksınız.

## Klavye Layout’unu Özelleştir

Nasıl ki sık kullandığınız uygulamaları kolayca açmak için masaüstünde tutuyor veya uygulamayı açmak
için bir kısayol tanımlıyorsanız klavyenizde de sık kullandığınız tuşları yakınınızda tutmak
işlerinizi hızlandıracaktır. Burada sık kullandığınız tuşlar derken karakter tuşlarından değil de
Backspace, Ok Tuşları, Home, End gibi özel tuşlardan bahsediyorum. Örneğin yazı yazarken Backspace
tuşuna basmak için elimizi harflerin olduğu yerden kaldırıp backspace tuşunun olduğu yere
döndürmemiz gerekiyor, bunun yerine hiç kullanmadığımız CapsLock (büyük harf yazmak için Shift
tuşunu kullanın) tuşunu Backspace olarak tanımlayabilirsek sol serçe parmağımızla elimizi döndürmeye
gerek duymadan kolayca karakter silme işlemini yapmış oluruz. Bu tuşların yerlerini değiştirme
işlemi “key remapping” / “keyboard remapping” olarak adlandırılıyor ve bir Linux sistemi
kullanıyorsanız yeni keşfettiğim [keyd](https://github.com/rvaiya/keyd) yazılımı ile bu key
remapping işlemini oldukça kolay bir şekilde yapılabilirsiniz.

## keyd Nedir ve Nasıl Kurulur?

keyd, Linux sistemlerinde klavye tuşlarının işlevlerini özelleştirmek için kullanılan bir
yazılımdır. Hem X11 hem de Wayland grafik arayüz altyapılarında kullanılabilmesi ve oldukça kolay
konfigüre edilebilmesiyle benim için diğer key remapping yazılımlarından öne çıkmaktadır.

Sisteminize keyd yazılımını kaynak kodunu derleyerek kurabilirsiniz. [GitHub
reposunda](https://github.com/rvaiya/keyd) bu işlemin nasıl yapılacağı açık bir şekilde belirtilmiş.
Oldukça kısa süren kolay bir işlem, gözünüz korkmasın.

Kurulum sonrasında `$ systemctl status keyd` ile keyd daemon’unun çalıştığından emin olun. keyd’yi
isterseniz `$ sudo systemctl stop keyd` ile durdurup, `$ sudo systemctl start keyd` ile geri
başlatabilirsiniz. Kurulum sırasında `$ sudo systemctl enable keyd` yaptıysanız bilgisayar
açıldığında keyd de otomatik olarak başlayacaktır, bunu istemiyorsanız `$ sudo systemctl disable
keyd` ile otomatik başlamasını devre dışı bırakabilirsiniz.

### CapsLock Tuşunu Backspace Olarak Kullan

Yukarıda da bahsettiğim gibi CapsLock tuşuna Backspace işlevi kazandırmak oldukça verimli bir
özelleştirmedir. keyd üzerindeki ilk konfigürasyonumuzu da bu CapsLock tuşundan CapsLock işlevini
kaldırıp Backspace işlevi kazandırmak için yapalım. `$ sudo nano /etc/keyd/default.conf` ile
keyd’nin config belgesini açıp aşağıdaki konfigürasyonu ekleyin:

```ini
[ids]
*

[main]
capslock = backspace
```

Sonrasında `$ sudo keyd reload` komutu ile keyd’nin yeni konfigürasyonla yeniden başlatılmasını
sağlayın. Tebrikler 🎉, keyd ile ilk key remapping’inizi yaptınız. Yaptığınız key remapping’ini bir
metin editöründe test edebilirsiniz.

Detaylara çok inmeden keyd’nin konfigürasyon şemasından bahsedeyim. `[ids]` başlığı altına bu
belgedeki konfigürasyonun bilgisayara bağlı hangi cihazlar için çalışması istediğini yazabilirsiniz,
bilgisayara bağlı tüm klavyelerde aynı konfigürasyonu kullanmak istiyorsanız benim yaptığım gibi `*`
ekleyebilirsiniz. `[main]` başlığı varsayılan layer olan main layer’ında kullanılacak maplemelerin
tutulduğu yerdir. Buraya eklediğimiz `capslock = backspace` satırıyla da capslock tuşuna
basıldığında backspace tuşuna basılmış say diyoruz.

### Ok Tuşlarını Harflerin Arasına Taşı

Popüler bir metin editörü olan Vim’de normal modda metin içerisinde gezinmek için ok tuşları yerine
h j k l harfleri kullanılabiliyor ve birçok Vim kullanıcısı bu yöntemi tercih ediyor. Sebebi ise
oldukça açık, yazı yazarken h j k l harflerine basmak ok tuşlarına basmaktan çok daha rahat. Ok
tuşlarına basmak için elimizi neredeyse kolumuzla birlikte ok tuşlarına taşımamız gerekirken h j k l
tuşları hali hazırda ellerin klavyedeki ana konumunda olduğu için daha erişilebilir oluyor. 

Peki h j k l tuşlarını günlük hayatımızda nasıl ok tuşları olarak kullanacağız ki? Yazı yazarken h j
k l tuşlarına da ihtiyaç duyuyoruz netice, bu karakterleri ok tuşlarıyla yer değiştirmek oldukça
verimsiz olur değil mi? Evet, işte burada layer’lar işin içerisine giriyor. Bizim main layer’ımız
vardı hatırlarsanız, bu layer varsayılan olarak aktif durumda. Biz yeni bir layer oluşturup yalnızca
istediğimiz zaman o layer’ı aktif hale getirerek klavyemize bir nevi kaçak kat çıkacağız 😄.
Öncelikle layer’ı aktif etmek için kullanılacak tuşa karar vermemiz gerek. Bunun için ben sağ el baş
parmağımın hemen altında olan sağ Alt tuşu yani AltGr’yi kullanacağım. Planım `Altgr + h`
kombinasyonu Sol Ok tuşu, `Altgr + j` kombinasyonu Aşağı Ok tuşu, `Altgr + k` kombinasyonu Yukarı Ok
tuşu, `Altgr + l` kombinasyonun da Sağ Ok tuşu olarak çalışması. Bunun için kullanacağımız config şu
şekilde:

```ini
[ids]
*

[main]
capslock = backspace
altgr = layer(nav)

[nav]
h = left
j = down
k = up
l = right
```

Burada `altgr = layer(nav)` satırı ile altgr tuşu basılı olduğu sürece nav layer’ını kullan demiş
olduk. `$ sudo keyd reload` yapıp yeni konfigürasyonu yükleyip sonucun planladığımız gibi
çalıştığını görebilirsiniz. Ancak bir problem var, artık AltGr tuşunu kullanamıyoruz. Klavyenizde
AltGr’yi kullanarak özel karakter yazmayı denediğinizde bunu yapamadığınızı göreceksiniz. Bunun
çözümü ise oldukça basit. Config belgesindeki [nav] satırını [nav:G] olarak güncellemeniz
yeterlidir. :G ekleyerek altgr tuşuna nav layer’ı altında belirtilmemiş bir tuşa basıldığında `AltGr
+ <basılan tuş>` olarak çalışmaya devam etmesini söylüyorüz (Bu durum hakkında daha fazla bilgi için
keyd’nin manpage’indeki Layers başlığı altına bakmanızı öneririm). Aslında altgr tuşuna maplenmemiş
başka bir tuşla basıldığı durumu handle etmek için keyd bize hazır bir [altgr] layer’ı sunuyor:

```ini
[ids]
*

[main]
capslock = backspace

[altgr]
h = left
j = down
k = up
l = right
```

Bu config ile artık ok tuşlarını harflerin arasına taşımış ve AltGr tuşunun da kendi işlevini devam
ettirmesini sağlamış olduk.

Her ne kadar bu yazıda daha popüler olduğu için hjkl tuşları kullanmış olsam da kendi sistemimde
ijkl tuşlarını tercih ediyorum. Benim kullandığım keyd konfigürasyonunu GitHub’daki dotfiles
repomdan inceleyebilirsiniz:
[github.com/berk-karaal/dotfiles](https://github.com/berk-karaal/dotfiles/blob/b939c3858c969a117098d0e02d1ac8a3e752f88a/etc/keyd/default.conf)

Keyd ile ilgili daha fazla bilgi edinmek için github sayfasını ve manpage’ini inceleyebilirsiniz.

Keyd GitHub repo: [github.com/rvaiya/keyd](https://github.com/rvaiya/keyd)