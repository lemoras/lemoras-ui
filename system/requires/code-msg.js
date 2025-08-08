var notifyCodeMsg = [
  {
    code: "0x11001", detail: {
      "en": "Email address is required",
      "tr": "E-posta adresi gerekli",
      "ru": "Требуется адрес электронной почты"
    }
  },
  {
    code: "0x11002", detail: {
      "en": "Password is required",
      "tr": "Şifre gerekli",
      "ru": "Требуется пароль"
    }
  },
  {
    code: "0x11003", detail: {
      "en": "Email address is not valid",
      "tr": "E-posta adresi geçerli değil",
      "ru": "Адрес электронной почты недействителен"
    }
  },
  {
    code: "0x11004", detail: {
      "en": "Connection error. Please retry",
      "tr": "Bağlantı hatası. Lütfen tekrar deneyin",
      "ru": "Ошибка подключения. Пожалуйста, повторите попытку"
    }
  },
  {
    code: "0x11005", detail: {
      "en": "Email address already in use by another user",
      "tr": "E-posta adresi başka bir kullanıcı tarafından zaten kullanılıyor",
      "ru": "Адрес электронной почты уже используется другим пользователем"
    }
  },
  {
    code: "0x11006", detail: {
      "en": "Requirement passed",
      "tr": "Gereksinim geçildi",
      "ru": "Требование выполнено"
    }
  },
  {
    code: "0x11007", detail: {
      "en": "Failed to create account, connection error",
      "tr": "Hesap oluşturulamadı, bağlantı hatası",
      "ru": "Не удалось создать учетную запись, ошибка подключения"
    }
  },
  {
    code: "0x11008", detail: {
      "en": "Account has been created",
      "tr": "Hesap oluşturuldu",
      "ru": "Учетная запись создана"
    }
  },
  {
    code: "0x11009", detail: {
      "en": "The password is changed only by its owner",
      "tr": "Şifre sadece sahibi tarafından değiştirilir",
      "ru": "Пароль меняется только его владельцем"
    }
  },
  {
    code: "0x11010", detail: {
      "en": "Password error",
      "tr": "Şifre hatası",
      "ru": "Ошибка пароля"
    }
  },
  {
    code: "0x11011", detail: {
      "en": "Current Password is not valid",
      "tr": "Mevcut Şifre geçerli değil",
      "ru": "Текущий пароль недействителен"
    }
  },
  {
    code: "0x11012", detail: {
      "en": "The email is changed only by its owner",
      "tr": "E-posta sadece sahibi tarafından değiştirilir",
      "ru": "Электронная почта меняется только ее владельцем"
    }
  },
  {
    code: "0x110013", detail: {
      "en": "Failed to modify account, can't update values",
      "tr": "Hesap değiştirilemedi, değerler güncellenemiyor",
      "ru": "Не удалось изменить учетную запись, невозможно обновить значения"
    }
  },
  {
    code: "0x11014", detail: {
      "en": "Account has been modified",
      "tr": "Hesap değiştirildi",
      "ru": "Учетная запись изменена"
    }
  },
  {
    code: "0x11015", detail: {
      "en": "Account found it",
      "tr": "Hesap bulundu",
      "ru": "Учетная запись найдена"
    }
  },
  {
    code: "0x11016", detail: {
      "en": "The user was not found",
      "tr": "Kullanıcı bulunamadı",
      "ru": "Пользователь не найден"
    }
  },
  {
    code: "0x11017", detail: {
      "en": "It doesnt build a new token by strong token",
      "tr": "Güçlü bir token ile yeni bir token oluşturulmuyor",
      "ru": "Не создает новый токен сильным токеном"
    }
  },
  {
    code: "0x11018", detail: {
      "en": "AppId is zero value",
      "tr": "Uygulama Kimliği sıfır değeri",
      "ru": "AppId имеет нулевое значение"
    }
  },
  {
    code: "0x11019", detail: {
      "en": "MerchantId is zero value",
      "tr": "Satıcı Kimliği sıfır değeri",
      "ru": "MerchantId имеет нулевое значение"
    }
  },
  {
    code: "0x11020", detail: {
      "en": "You do not have access authority",
      "tr": "Erişim yetkiniz yok",
      "ru": "У вас нет прав доступа"
    }
  },
  {
    code: "0x11021", detail: {
      "en": "Email address not found",
      "tr": "E-posta adresi bulunamadı",
      "ru": "Адрес электронной почты не найден"
    }
  },
  {
    code: "0x11022", detail: {
      "en": "Invalid login credentials. Please try again",
      "tr": "Geçersiz giriş bilgileri. Lütfen tekrar deneyin",
      "ru": "Неверные учетные данные. Пожалуйста, попробуйте еще раз"
    }
  },
  {
    code: "0x11023", detail: {
      "en": "Logged In",
      "tr": "Giriş Yapıldı",
      "ru": "Выполнен вход"
    }
  },
  {
    code: "0x11024", detail: {
      "en": "The user's role was not found for the specified application",
      "tr": "Belirtilen uygulama için kullanıcının rolü bulunamadı",
      "ru": "Роль пользователя не найдена для указанного приложения"
    }
  },
  {
    code: "0x11025", detail: {
      "en": "The user's role was not match for the specified application",
      "tr": "Belirtilen uygulama için kullanıcının rolü eşleşmedi",
      "ru": "Роль пользователя не соответствует указанному приложению"
    }
  },
  {
    code: "0x11026", detail: {
      "en": "Check user is ok",
      "tr": "Kullanıcı kontrolü tamam",
      "ru": "Проверка пользователя в порядке"
    }
  },
  {
    code: "0x11027", detail: {
      "en": "Login success but, Connection error. Please retry",
      "tr": "Giriş başarılı ancak, bağlantı hatası. Lütfen tekrar deneyin",
      "ru": "Вход выполнен успешно, но произошла ошибка подключения. Пожалуйста, повторите попытку"
    }
  },
  {
    code: "0x11028", detail: {
      "en": "Invalid request",
      "tr": "Geçersiz istek",
      "ru": "Неверный запрос"
    }
  },
  {
    code: "0x11029", detail: {
      "en": "RoleId is zero value",
      "tr": "Rol Kimliği sıfır değeri",
      "ru": "RoleId имеет нулевое значение"
    }
  },
  {
    code: "0x11030", detail: {
      "en": "UserId is zero value",
      "tr": "Kullanıcı Kimliği sıfır değeri",
      "ru": "UserId имеет нулевое значение"
    }
  },
  {
    code: "0x11031", detail: {
      "en": "Success",
      "tr": "Başarılı",
      "ru": "Успешно"
    }
  },
  {
    code: "0x11032", detail: {
      "en": "User Id is empty",
      "tr": "Kullanıcı Kimliği boş",
      "ru": "Идентификатор пользователя пуст"
    }
  },
  {
    code: "0x11033", detail: {
      "en": "missing file_name or content_type",
      "tr": "dosya_adı veya içerik_türü eksik",
      "ru": "отсутствует file_name или content_type"
    }
  },
  {
    code: "0x11034", detail: {
      "en": "Migration done..",
      "tr": "Taşıma tamamlandı..",
      "ru": "Миграция завершена.."
    }
  },
  {
    code: "0x11035", detail: {
      "en": "Migration & new project done..",
      "tr": "Taşıma ve yeni proje tamamlandı..",
      "ru": "Миграция и новый проект завершены.."
    }
  },
  {
    code: "0x11036", detail: {
      "en": "Created new projects",
      "tr": "Yeni projeler oluşturuldu",
      "ru": "Созданы новые проекты"
    }
  },
  {
    code: "0x11037", detail: {
      "en": "Domains is empty",
      "tr": "Alanlar boş",
      "ru": "Домены пусты"
    }
  },
  {
    code: "0x11038", detail: {
      "en": "Project name is empty",
      "tr": "Proje adı boş",
      "ru": "Имя проекта пусто"
    }
  },
  {
    code: "0x11039", detail: {
      "en": "Project not found or already soft deleted",
      "tr": "Proje bulunamadı veya zaten silindi",
      "ru": "Проект не найден или уже мягко удален"
    }
  },
  {
    code: "0x11040", detail: {
      "en": "Project passived but Users werent passived",
      "tr": "Proje pasifleştirildi ancak kullanıcılar pasifleştirilmedi",
      "ru": "Проект деактивирован, но пользователи не деактивированы"
    }
  },
  {
    code: "0x11041", detail: {
      "en": "Project activated but Users werent activated",
      "tr": "Proje aktifleştirildi ancak kullanıcılar aktifleştirilmedi",
      "ru": "Проект активирован, но пользователи не активированы"
    }
  },
  {
    code: "0x11042", detail: {
      "en": "Project and users have passived. You can activate it through the portal from which you receive service",
      "tr": "Proje ve kullanıcılar pasifleştirildi. Hizmet aldığınız portal üzerinden aktifleştirebilirsiniz",
      "ru": "Проект и пользователи деактивированы. Вы можете активировать его через портал, с которого получаете услугу"
    }
  },
  {
    code: "0x11043", detail: {
      "en": "Project and users updated by successful",
      "tr": "Proje ve kullanıcılar başarıyla güncellendi",
      "ru": "Проект и пользователи успешно обновлены"
    }
  },
  {
    code: "0x11044", detail: {
      "en": "Project deleted but Users werent deleted",
      "tr": "Proje silindi ancak kullanıcılar silinmedi",
      "ru": "Проект удален, но пользователи не удалены"
    }
  },
  {
    code: "0x11045", detail: {
      "en": "Project deleted and Users deleted by successful",
      "tr": "Proje silindi ve kullanıcılar başarıyla silindi",
      "ru": "Проект удален, и пользователи успешно удалены"
    }
  },
  {
    code: "0x11046", detail: {
      "en": "Error file delete from space",
      "tr": "Dosyayı alandan silme hatası",
      "ru": "Ошибка удаления файла из пространства"
    }
  },
  {
    code: "0x11047", detail: {
      "en": "Account has been modified",
      "tr": "Hesap değiştirildi",
      "ru": "Учетная запись изменена"
    }
  },
  {
    code: "0x11048", detail: {
      "en": "Zombie roles found it",
      "tr": "Zombi rolleri bulundu",
      "ru": "Найдены зомби-роли"
    }
  },
  {
    code: "0x11049", detail: {
      "en": "General error",
      "tr": "Genel hata",
      "ru": "Общая ошибка"
    }
  },
  {
    code: "0x11050", detail: {
      "en": "Invalid parameter",
      "tr": "Geçersiz parametre",
      "ru": "Неверный параметр"
    }
  },
  {
    code: "0x11051", detail: {
      "en": "Data not found",
      "tr": "Veri bulunamadı",
      "ru": "Данные не найдены"
    }
  },
  {
    code: "0x11052", detail: {
      "en": "Database error",
      "tr": "Veritabanı hatası",
      "ru": "Ошибка базы данных"
    }
  },
  {
    code: "0x11053", detail: {
      "en": "Permission denied",
      "tr": "Erişim reddedildi",
      "ru": "Доступ запрещен"
    }
  },
  {
    code: "0x11054", detail: {
      "en": "Service unavailable",
      "tr": "Hizmet kullanılamıyor",
      "ru": "Сервис недоступен"
    }
  },
  {
    code: "0x11055", detail: {
      "en": "Timeout",
      "tr": "Zaman aşımı",
      "ru": "Тайм-аут"
    }
  },
  {
    code: "0x11056", detail: {
      "en": "File upload failed",
      "tr": "Dosya yükleme başarısız oldu",
      "ru": "Не удалось загрузить файл"
    }
  },
  {
    code: "0x11057", detail: {
      "en": "Network error",
      "tr": "Ağ hatası",
      "ru": "Ошибка сети"
    }
  },
  {
    code: "0x11058", detail: {
      "en": "Authentication failed",
      "tr": "Kimlik doğrulama başarısız oldu",
      "ru": "Сбой аутентификации"
    }
  },
  {
    code: "0x11059", detail: {
      "en": "Invalid format",
      "tr": "Geçersiz biçim",
      "ru": "Неверный формат"
    }
  },
  {
    code: "0x11060", detail: {
      "en": "Item already exists",
      "tr": "Öğe zaten mevcut",
      "ru": "Элемент уже существует"
    }
  },
  {
    code: "0x11061", detail: {
      "en": "Too many requests",
      "tr": "Çok fazla istek",
      "ru": "Слишком много запросов"
    }
  },
  {
    code: "0x11062", detail: {
      "en": "Out of memory",
      "tr": "Bellek yetersiz",
      "ru": "Недостаточно памяти"
    }
  },
  {
    code: "0x11063", detail: {
      "en": "Configuration error",
      "tr": "Yapılandırma hatası",
      "ru": "Ошибка конфигурации"
    }
  },
  {
    code: "0x11064", detail: {
      "en": "Update failed",
      "tr": "Güncelleme başarısız oldu",
      "ru": "Сбой обновления"
    }
  },
  {
    code: "0x11065", detail: {
      "en": "Delete failed",
      "tr": "Silme başarısız oldu",
      "ru": "Сбой удаления"
    }
  },
  {
    code: "0x11066", detail: {
      "en": "Creation failed",
      "tr": "Oluşturma başarısız oldu",
      "ru": "Сбой создания"
    }
  },
  {
    code: "0x11067", detail: {
      "en": "Unknown error",
      "tr": "Bilinmeyen hata",
      "ru": "Неизвестная ошибка"
    }
  },
  {
    code: "0x11068", detail: {
      "en": "unable to get signed url",
      "tr": "imzalı URL alınamıyor",
      "ru": "не удается получить подписанный URL"
    }
  },
  {
    code: "0x11069",
    detail: {
      "en": "Operation successful",
      "tr": "İşlem başarılı",
      "ru": "Операция прошла успешно"
    }
  },
  {
    code: "0x11070",
    detail: {
      "en": "You do not have access authorization",
      "tr": "Erişim yetiniz bulunmamaktadır",
      "ru": "У вас нет прав доступа"
    }
  },
  {
    code: "0x11071",
    detail: {
      "en": "Permission cannot be granted because you are not logged in",
      "tr": "Giriş yapılmadığı için izin verilememektedir",
      "ru": "Разрешение не может быть предоставлено, так как вы не вошли в систему"
    }
  },
  {
    code: "0x11072",
    detail: {
      "en": "The requested item could not be found",
      "tr": "Aranılan istek bulunulamadı",
      "ru": "Запрашиваемый элемент не найден"
    }
  },
  {
    code: "0x11073",
    detail: {
      "en": "An unknown error occurred on the server",
      "tr": "Sunucuda bilinmeyen bir hata oluştu",
      "ru": "На сервере произошла неизвестная ошибка"
    }
  },
  {
    code: "0x11074",
    detail: {
      "en": "Bad gateway error occurred",
      "tr": "Hatalı ağ geçidi hatası oluştu",
      "ru": "Произошла ошибка шлюза"
    }
  },
  {
    code: "0x11075",
    detail: {
      "en": "New passwords do not match",
      "tr": "Yeni şifreler uyuşmamaktadır",
      "ru": "Новые пароли не совпадают"
    }
  },
  {
    code: "0x11076",
    detail: {
      "en": "Info!",
      "tr": "Bilgi!",
      "ru": "Информация!"
    }
  },
  {
    code: "0x11077",
    detail: {
      "en": "You are already registered in the system",
      "tr": "Sistemde kaydınız mevcuttur",
      "ru": "Вы уже зарегистрированы в системе"
    }
  },
  {
    code: "0x11078",
    detail: {
      "en": "Okay",
      "tr": "Tamam",
      "ru": "Окей"
    }
  },
  {
    code: "0x11079",
    detail: {
      "en": "Your registration has been created",
      "tr": "Kaydınız oluşturulmuştur",
      "ru": "Ваша регистрация создана"
    }
  },
  {
    code: "0x11080",
    detail: {
      "en": "Your password has been updated",
      "tr": "Şifreniz Güncellenmiştir",
      "ru": "Ваш пароль обновлен"
    }
  },
  {
    code: "0x11081",
    detail: {
      "en": "Error!",
      "tr": "Hata!",
      "ru": "Ошибка!"
    }
  },
  {
    code: "0x11082",
    detail: {
      "en": "Are you sure?",
      "tr": "Emin misiniz?",
      "ru": "Вы уверены?"
    }
  },
  {
    code: "0x11083",
    detail: {
      "en": "Your profile photo will be changed!",
      "tr": "Profil fotoğrafınız değiştirilecektir!",
      "ru": "Ваше фото профиля будет изменено!"
    }
  },
  {
    code: "0x11084",
    detail: {
      "en": "Yes, change!",
      "tr": "Evet, değiştir!",
      "ru": "Да, изменить!"
    }
  },
  {
    code: "0x11085",
    detail: {
      "en": "No, cancel!",
      "tr": "Hayır, iptal!",
      "ru": "Нет, отменить!"
    }
  },
  {
    code: "0x11086",
    detail: {
      "en": "Your profile photo has been changed",
      "tr": "Profil fotoğrafınız değiştirilmiştir",
      "ru": "Ваше фото профиля изменено"
    }
  },
  {
    code: "0x11087",
    detail: {
      "en": "Warning",
      "tr": "Uyarı",
      "ru": "Предупреждение"
    }
  },
  {
    code: "0x11088",
    detail: {
      "en": "Your profile photo could not be changed",
      "tr": "Profil fotoğrafınız değiştirilememiştir",
      "ru": "Ваше фото профиля не может быть изменено"
    }
  },
  {
    code: "0x11089",
    detail: {
      "en": "An error occurred, your password could not be updated",
      "tr": "Bir hata oluştu, şifreniz güncellenemedi",
      "ru": "Произошла ошибка, ваш пароль не может быть обновлен"
    }
  },
  {
    code: "0x11090",
    detail: {
      "en": "Email address is invalid or empty",
      "tr": "E-Posta adresi geçersiz veya boş",
      "ru": "Адрес электронной почты недействителен или пуст"
    }
  },
  {
    code: "0x11091",
    detail: {
      "en": "Nickname is invalid or empty",
      "tr": "takma ad geçersiz veya boş",
      "ru": "Имя пользователя недействительно или пусто"
    }
  },
  {
    code: "0x11092",
    detail: {
      "en": "Your profile information has been updated",
      "tr": "Profil bilgileriniz güncellenmiştir",
      "ru": "Ваша информация профиля обновлена"
    }
  },
  {
    code: "0x11093",
    detail: {
      "en": "An error occurred, your profile information could not be updated",
      "tr": "Bir hata oluştu, profil bilgileriniz güncellenemedi",
      "ru": "Произошла ошибка, ваша информация профиля не может быть обновлена"
    }
  },
  {
    code: "0x11094",
    detail: {
      "en": "The template could not be changed for some reason",
      "tr": "Şablon bir nedenden ötürü değiştirilemedi",
      "ru": "Шаблон не может быть изменен по некоторым причинам"
    }
  },
  {
    code: "0x11095",
    detail: {
      "en": "Another staff member is using the username",
      "tr": "Kullanıcı adını başka bir personel kullanıyor",
      "ru": "Другой сотрудник использует это имя пользователя"
    }
  },
  {
    code: "0x11096",
    detail: {
      "en": "Name is invalid or empty",
      "tr": "İsim geçersiz veya boş",
      "ru": "Имя недействительно или пусто"
    }
  },
  {
    code: "0x11097",
    detail: {
      "en": "About is invalid or empty",
      "tr": "Hakkında geçersiz veya boş",
      "ru": "Информация недействительна или пуста"
    }
  },
  {
    code: "0x11098",
    detail: {
      "en": "The entered passwords must be the same",
      "tr": "Girilen şifreler aynı olmalıdır",
      "ru": "Введенные пароли должны совпадать"
    }
  },
  {
    code: "0x11099",
    detail: {
      "en": "Role information cannot be left blank",
      "tr": "Rol bilgisi boş bırakılamaz",
      "ru": "Информация о роли не может быть пустой"
    }
  },
  {
    code: "0x11100",
    detail: {
      "en": "Are you sure you want to add the user?",
      "tr": "Kullanıcıyı eklemek istediğinize emin misiniz?",
      "ru": "Вы уверены, что хотите добавить пользователя?"
    }
  },
  {
    code: "0x11101",
    detail: {
      "en": "Yes, add!",
      "tr": "Evet, ekle!",
      "ru": "Да, добавить!"
    }
  },
  {
    code: "0x11102",
    detail: {
      "en": "User has been added",
      "tr": "Kullanıcı eklenmiştir",
      "ru": "Пользователь добавлен"
    }
  },
  {
    code: "0x11103",
    detail: {
      "en": "Add new user",
      "tr": "Yeni kullanıcı ekle",
      "ru": "Добавить нового пользователя"
    }
  },
  {
    code: "0x11104",
    detail: {
      "en": "<<<< System has been initialized! >>>>",
      "tr": "<<<< Sistem başlatıldı! >>>>",
      "ru": "<<<< Система инициализирована! >>>>"
    }
  },
  {
    code: "0x11105",
    detail: {
      "en": "Root password is : ",
      "tr": "Root şifresi : ",
      "ru": "Пароль root : "
    }
  },
  {
    code: "0x11106",
    detail: {
      "en": "Error - System did not initialized! - Error",
      "tr": "Hata - Sistem başlatılamadı! - Hata",
      "ru": "Ошибка - Система не инициализирована! - Ошибка"
    }
  },
  {
    code: "0x11107",
    detail: {
      "en": "Delete?",
      "tr": "Sil?",
      "ru": "Удалить?"
    }
  },
  {
    code: "0x11108",
    detail: {
      "en": "Are you sure you want to delete the user?",
      "tr": "Kullanıcıyı silmek istediğinize emin misiniz?",
      "ru": "Вы уверены, что хотите удалить пользователя?"
    }
  },
  {
    code: "0x11109",
    detail: {
      "en": "Yes",
      "tr": "Evet",
      "ru": "Да"
    }
  },
  {
    code: "0x11110",
    detail: {
      "en": "No!",
      "tr": "Hayır!",
      "ru": "Нет!"
    }
  },
  {
    code: "0x11111",
    detail: {
      "en": "Are you sure you want to deactivate the user?",
      "tr": "Kullanıcıyı pasif etmek istediğinize emin misiniz?",
      "ru": "Вы уверены, что хотите деактивировать пользователя?"
    }
  },
  {
    code: "0x11112",
    detail: {
      "en": "Are you sure you want to activate the user?",
      "tr": "Kullanıcıyı aktif etmek istediğinize emin misiniz?",
      "ru": "Вы уверены, что хотите активировать пользователя?"
    }
  },
  {
    code: "0x11113",
    detail: {
      "en": "Active | Passive ?",
      "tr": "Aktif | Pasif ?",
      "ru": "Активный | Пассивный ?"
    }
  },
  {
    code: "0x11114", detail: {
      "en": "Are you sure you want to delete the note?",
      "tr": "Not'u silmek istediğinize emin misiniz?",
      "ru": "Вы уверены, что хотите удалить заметку?",
    }
  },
  {
    code: "0x11115",
    detail: {
      "en": "Are you sure you want to delete the project?",
      "tr": "Projeyi silmek istediğinize emin misiniz?",
      "ru": "Вы уверены, что хотите удалить проект?",
    }
  },
  {
    code: "0x11116",
    detail: {
      "en": "Are you sure you want to deactivate the project?",
      "tr": "Projeyi pasif etmek istediğinize emin misiniz?",
      "ru": "Вы уверены, что хотите деактивировать проект?",
    }
  },
  {
    code: "0x11117",
    detail: {
      "en": "Are you sure you want to activate the project?",
      "tr": "Projeyi aktif etmek istediğinize emin misiniz?",
      "ru": "Вы уверены, что хотите активировать проект?",
    }
  },
  {
    code: "0x11118",
    detail: {
      "en": "Password field is empty",
      "tr": "Şifre alanı boş",
      "ru": "Поле пароля пусто",
    }
  },
  {
    code: "0x11119",
    detail: {
      "en": "Root Session RENEWED",
      "tr": "Root Oturumu YENİLENDİ",
      "ru": "Сессия Root ОБНОВЛЕНА",
    }
  },
  {
    code: "0x11120",
    detail: {
      "en": "WRONG!!!",
      "tr": "YANLIŞ!!!",
      "ru": "НЕПРАВИЛЬНО!!!",
    }
  },
  {
    code: "0x11121",
    detail: {
      "en": "Project choose",
      "tr": "Proje seçimi",
      "ru": "Выбор проекта",
    }
  },
  {
    code: "0x11122",
    detail: {
      "en": " created",
      "tr": " oluşturuldu",
      "ru": " создан",
    }
  },
  {
    code: "0x11123",
    detail: {
      "en": "Email field is empty",
      "tr": "E-posta alanı boş",
      "ru": "Поле электронной почты пусто",
    }
  },
  {
    code: "0x11124",
    detail: {
      "en": " created as merchant admin",
      "tr": " bayi yöneticisi olarak oluşturuldu",
      "ru": " создан как администратор продавца",
    }
  },
  {
    code: "0x11125",
    detail: {
      "en": "<<<< Lemoras Project has been checked & if it has, created by successful! >>>>",
      "tr": "<<<< Lemoras Projesi kontrol edildi ve başarılı bir şekilde oluşturuldu! >>>>",
      "ru": "<<<< Проект Lemoras проверен и, если он есть, успешно создан! >>>>",
    }
  },
  {
    code: "0x11126",
    detail: {
      "en": "System has been Reset!",
      "tr": "Sistem Sıfırlandı!",
      "ru": "Система была сброшена!",
    }
  },
  {
    code: "0x11127",
    detail: {
      "en": "Exit",
      "tr": "Çıkış",
      "ru": "Выход",
    }
  },
  {
    code: "0x11128",
    detail: {
      "en": "Would you like to exit system, sure ?",
      "tr": "Sistemden çıkmak istediğinize emin misiniz ?",
      "ru": "Вы уверены, что хотите выйти из системы?",
    }
  },
  {
    code: "0x11129",
    detail: {
      "en": "Cancel",
      "tr": "İptal",
      "ru": "Отмена",
    }
  },
  {
    code: "0x11130",
    detail: {
      "en": "Missing auth token",
      "tr": "Doğrulama belirteci eksik",
      "ru": "Отсутствует токен аутентификации",
    }
  },
  {
    code: "0x11131",
    detail: {
      "en": "The user's note was not found for the specified application",
      "tr": "Belirtilen uygulama için kullanıcının notu bulunamadı",
      "ru": "Заметка пользователя не найдена для указанного приложения",
    }
  },
  {
    code: "0x11132",
    detail: {
      "en": "Failed to create note, connection error",
      "tr": "Not oluşturulamadı, bağlantı hatası",
      "ru": "Не удалось создать заметку, ошибка подключения",
    }
  },
  {
    code: "0x11133",
    detail: {
      "en": "Note has been created",
      "tr": "Not oluşturuldu",
      "ru": "Заметка создана",
    }
  },
  {
    code: "0x11134",
    detail: {
      "en": "Unkown note error. Please retry",
      "tr": "Bilinmeyen not hatası. Lütfen tekrar deneyin",
      "ru": "Неизвестная ошибка заметки. Пожалуйста, повторите попытку",
    }
  },
  {
    code: "0x11135",
    detail: {
      "en": "Note has been changed category",
      "tr": "Notun kategorisi değiştirildi",
      "ru": "Категория заметки изменена",
    }
  },
  {
    code: "0x11136",
    detail: {
      "en": "Note has been changed category",
      "tr": "Notun kategorisi değiştirildi",
      "ru": "Категория заметки изменена",
    }
  },
  {
    code: "0x11137",
    detail: {
      "en": "No projects found for this domain",
      "tr": "Bu alan adına ait proje bulunamadı",
      "ru": "Для этого домена не найдено ни одного проекта",
    }
  },
  {
    code: "0x11138",
    detail: {
      "en": "Your account has been locked due to 9 unsuccessful login attempts",
      "tr": "Hesabınız, 9 başarısız giriş denemesi nedeniyle kilitlenmiştir",
      "ru": "Ваша учетная запись заблокирована из-за 9 неудачных попыток входа",
    }
  },
  {
    code: "0x11139",
    detail: {
      "en": "You have entered incorrect credentials 3 times. You need to wait 5 minutes after your last unsuccessful attempt",
      "tr": "3 kez hatalı giriş yaptınız. Son hatalı girişinizden sonra 5 dakika beklemeniz gerekmektedir",
      "ru": "Вы ввели неверные учетные данные 3 раза. Вам необходимо подождать 5 минут после последней неудачной попытки",
    }
  },
  {
    code: "0x11140",
    detail: {
      "en": "You have entered incorrect credentials 6 times. You need to wait 15 minutes after your last unsuccessful attempt",
      "tr": "6 kez hatalı giriş yaptınız. Son hatalı girişinizden sonra 15 dakika beklemeniz gerekmektedir",
      "ru": "Вы ввели неверные учетные данные 6 раза. Вам необходимо подождать 15 минут после последней неудачной попытки",
    }
  },
  {
    code: "0x11141",
    detail: {
      "en": "Rather than a technical error, a request was sent to the server with manually manipulated data. This is a fraud operation",
      "tr": "Teknik bir hatadan ziyade, manuel olarak düzenlenen verilerle sunucuya istek atılmıştır. Bu bir dolandırıcılık operasyonudur",
      "ru": "Вместо технической ошибки, запрос был отправлен на сервер с вручную измененными данными. Это мошенническая операция",
    }
  },
  {
    code: "0x11142",
    detail: {
      "en": "The update for account locking and incorrect login attempts could not be completed",
      "tr": "Hesap kilitleme işlemi ve hatalı girişlerle ilgili güncelleme yapılamadı",
      "ru": "Не удалось обновить информацию о блокировке учетной записи и неудачных попытках входа",
    }
  },
  {
    code: "0x11143",
    detail: {
      "en": "Invalid/Malformed auth token",
      "tr": "Geçersiz veya bozulmuş kimlik doğrulama anahtarı",
      "ru": "Неверный или повреждённый токен аутентификации",
    }
  },
  {
    code: "0x11144",
    detail: {
      "en": "Malformed authentication token",
      "tr": "Bozulmuş kimlik doğrulama anahtarı",
      "ru": "Повреждённый токен аутентификации",
    }
  }
];