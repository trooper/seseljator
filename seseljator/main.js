seki = {}

seki.update = function(content) {
  document.getElementById("content").innerHTML = content;

  var encoded_content = encodeURIComponent(content);
  var url = "https://www.facebook.com/dialog/feed?";
  url += "app_id=1185271438163741";
  url += "&display=popup&caption=Нова књига из едиције Шешељатора";
  url += "&description=" + encoded_content;
  url += "&picture=http://www.seseljator.com/icon.jpg";
  url += "&link=http://www.seseljator.com/?" + encoded_content;
  url += "&redirect_uri=http://www.seseljator.com/?" + encoded_content;

  document.getElementById("share-link").href = url;
};

seki.generate = function() {
  var check_box = document.getElementById("modifier-check");
  seki.intense = check_box.checked;

  var r = Math.random()
  var text = "";

  if (r < 0.4) {
    text = seki.get_name(2, 1);
  } else if (r < 0.5) {
    var a = seki.random(seki.nouns);
    var t = a[0].split(" ");
    text = "Афера " + t[t.length - 1];
    text += " и " + seki.get_name(1, 1);
  } else if (r < 0.7) {
    if (r < 0.6) {
      text = "Политички ортаци ";
    } else {
      text = "Љубавници ";
    }
    r = Math.random();
    var a1 = seki.get_name(0, 0);
    var a2 = seki.get_name(r < 0.5 ? 1 : 2, 1);
    text += a1 + " и " + a2;
  } else if (r < 0.9) {
    text = seki.get_name(2, 2);
  } else {
    var t = seki.get_name_tokens(2, 1);
    var name = t[t.length - 1];
    text = seki.format_name(t);
    var n = seki.random_with_gender(seki.names, name[1], [name[0]]);
    if (name[1] == "f") {
      text += ", нова " + n[0];
    } else {
      text += ", нови " + n[0];
    }
  }

  var bonus = "";
  r = Math.random()
  if (r < 0.35) {
    bonus = "<br /><br >" + seki.random_from_list(seki.bonuses);
  }

  return text + bonus;
};

seki.get_name_tokens = function(limit, nouns) {
  var output = [];
  var name = seki.random(seki.names);
  output.push(name);

  if (nouns > 0) {
    var noun = [];
    if (name[1] == "f") {
      noun = seki.random_with_gender(seki.nouns, name[1], null);
    } else {
      noun = seki.random(seki.nouns);
    }
    output.push(noun);

    if (nouns > 1) {
      var noun2 = seki.random_with_gender(seki.nouns, noun[1], [noun]);
      output.push("и");
      output.push(noun2);
    }
  }

  if (limit > 0 && (seki.intense || Math.random() < 0.7)) {
    var adj = seki.random_with_gender(seki.adjs, noun[1], null);
    output.push(adj);

    var adjs = [adj];

    if (limit > 1 && (seki.intense || Math.random() < 0.4)) {
      adj = seki.random_with_gender(seki.adjs, noun[1], adjs);
      output.push(adj);
      adjs.push(adj);
    }

    if (seki.intense) {
      adj = seki.random_with_gender(seki.adjs, noun[1], adjs);
      output.push(adj);
      adjs.push(adj);

      if (Math.random() < 0.3) {
        adj = seki.random_with_gender(seki.adjs, noun[1], adjs);
        output.push(adj);
        adjs.push(adj);
      }
    }
  }

  output.reverse();
  return output;
};

seki.format_name = function(tokens) {
  var buffer = [];
  for (var i = 0; i < tokens.length; ++i) {
    buffer.push(tokens[i][0]);
  }

  return buffer.join(" ");
};

seki.get_name = function(limit, nouns) {
  var output = seki.get_name_tokens(limit, nouns);
  return seki.format_name(output);
};

seki.random = function(list) {
  var index = Math.floor(Math.random() * list.length);
  return list[index];
};

seki.contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};

seki.random_from_list = function(list) {
    var index = Math.floor(Math.random() * list.length);
    return list[index];
};

seki.random_with_gender = function(list, gender, prev) {
  var index = 0;

  while (1) {
    var item = seki.random_from_list(list);
    if ((gender == null || item[1] == gender) && (prev == null || !seki.contains.call(prev, item[0]))) {
      return item;
    }
  }

  return null;
};

seki.get_width = function () {
  var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth;
  return x;
};

seki.addons = [
  ["вечито жедна српске крви", "f"],
  ["вечито жедан српске крви", "m"],
  ["вечито жедно српске крви", "o"],
  ["Бил Клинтон", "m"],
];

seki.names = [
  ["Теодор Мерон", "m"],
  ["Дел Понте", "f"],
  ["папа Јован Павле Други", "m"],
  ["Бил Клинтон", "m"],
  ["Тони Блер", "m"],
  ["Џефри Најс", "m"],
  ["Хелмут Кол", "m"],
  ["Ханс Геншер", "m"],
  ["Жак Ширак", "m"],
  ["Хавијер Солана", "m"],
  ["Мадлен Олбрајт", "f"],
  ["Хилари Клинтон", "f"],
  ["Борис Јељцин", "m"],
  ["Мило Ђукановић", "m"],
  ["Вук Драшковић", "m"],
  ["Борис Тадић", "m"],
  ["папа Бенедикт Шеснаести", "m"],
  ["Кевин Паркер", "m"],
  ["О-Гон Квон", "m"],
  ["Кристина Дал", "f"],
  ["Баконе Џастис Молото", "f"],
  ["Ханс Холтајус", "m"],
  ["Мохамед Шахабудин", "m"],
  ["Хилдегард Уерц-Рецлаф", "f"],
  ["Кофи Анан", "m"],
  ["Наташа Кандић", "f"],
  ["Зоран Ђинђић", "m"],
  ["Алија Изетбеговић", "m"],
  ["Алфонс Ори", "m"],
  ["Патрик Робинсон", "m"],
  ["Волфганг Шомбург", "m"],
  ["Томислав Николић", "m"],
  ["Александар Вучић", "m"],
  ["Јан Бономи", "m"],
  ["МАДЛЕН ОЛБРАЈТ", "f"],
  ["МИРЈАНА МАРКОВИЋ", "f"],
  ["КАРЛА ДЕЛ ПОНТЕ", "f"],
  ["КОЛИНДА ГРАБАР КИТАРОВИЋ", "f"],
  
  ["ВИЛИЈАМ КОЕН", "m"],
  ["ХАВИЈЕР СОЛАНА", "m"],
  ["СЛОБОДАН МИЛОШЕВИЋ", "m"],
  ["РОБИН КУК", "m"],
  ["БИЛ КЛИНТОН", "m"],
  ["ТОНИ БЛЕР", "m"],
  ["ВИЛИЈАМ ВОКЕР", "m"],
  ["РИЧАРД ХОЛБРУК", "m"],
  ["МОМИР БУЛАТОВИЋ", "m"],
  ["ДРАГОЉУБ МИЛАНОВИЋ", "m"],
  ["СТРОБ ТАЛБОТ", "m"],
  ["МАРТИ АХТИСАРИ", "m"],
  ["РЕМЗИ КЛАРК", "m"],
  ["ЏЕЈМИ ШЕЈ", "m"],
  ["ВЕСЛИ КЛАРК", "m"],
  ["РУПЕРТ СМИТ", "m"],
  ["НИКОЛА БАРОВИЋ", "m"],
  ["АЛЕКСАНДАР ВУЧИЋ", "m"],
  ["СЕРЖ БРАМЕРЦ", "m"],
  ["ФРЕДЕРИК ХАРХОФ", "m"],
  ["САДАМ ХУСЕИН", "m"],
  ["НЕБОЈША ЧОВИЋ", "m"],
  ["ЏЕФРИ НАЈС", "m"],
  ["СТАНКО СУБОТИЋ", "m"],
  ["ХЕЛМУТ КОЛ", "m"],
  ["ХАНС ГЕНШЕР", "m"],
  ["ЖАК ШИРАК", "m"],
  ["ВОЈИСЛАВ КОШТУНИЦА", "m"],
  ["ТОМИСЛАВ НИКОЛИЋ", "m"],
];

seki.nouns = [
  ["Велеиздајник", "m"],
  ["издајник", "m"],
  ["Глупсон", "m"],
  ["тиранин", "m"],
  ["Контра револуционар", "m"],
  ["јањичар", "m"],
  ["Криминалац", "m"],
  ["ратни злочинац", "m"],
  ["робијаш", "m"],
  ["Ђаволов шегрт", "m"],
  ["шегрт", "m"],
  ["сексуални манијак", "m"],
  ["испрдак", "m"],
  ["Очерупани пицопевац", "m"],
  ["пицопевац", "m"],
  ["Гуја", "m"],
  ["усташки конзул", "m"],
  ["пацов", "m"],
  ["Дегенерисани мајмун", "m"],
  ["мајмун", "m"],
  ["кукац", "m"],
  ["пацијент", "m"],
  ["пролив", "m"],
  ["чмар", "m"],

  ["усташка курва", "f"],
  ["педерчина", "f"],
  ["Вештица", "f"],
  ["курва", "f"],
  ["гњида", "f"],
  ["Очерупана Хашка ћурка", "f"],
  ["Очерупана ћурка", "f"],
  ["ћурка", "f"],
  ["Смрдљива свиња", "f"],
  ["свиња", "f"],
  ["конзерва", "f"],

  ["прасе", "o"],
  ["мудо", "o"],
  ["говно", "o"],
  
  ["ЂОН", "m"],
  ["ПЕРШУН", "m"],
  ["СМРАД", "m"],
  ["МАГАРАЦ", "m"],
  ["КОЊ", "m"],
  ["ВОДОЗЕМАЦ", "m"],
  ["ИДИОТ", "m"],
  ["ДИКТАТОР", "m"],
  ["ПРДЕЖ", "m"],
  ["ИЗБЉУВАК", "m"],
  ["ПУНОГЛАВАЦ", "m"],
  ["ПРИМИТИВАЦ", "m"],
  ["СЕЉАК", "m"],
  ["ЧМАР", "m"],
  ["ВЕЛЕИЗДАЈНИК", "m"],
  ["ТИРАНИН", "m"],
  ["НАРКОМАН", "m"],
  ["ИНКВИЗИТОР", "m"],
  ["МАФИЈАШ", "m"],
  ["МАНИЈАК", "m"],
  ["ИСПРДАК", "m"],
  ["ЂАВОЉИ НАМЕСНИК", "m"],
  ["АНТИХРИСТ", "m"],
  ["ПИЦОПЕВАЦ", "m"],
  ["ПУЗАВАЦ", "m"],
  ["МИТИСЕР", "m"],
  
  ["КОКОШКА", "f"],
  ["МАЗГА", "f"],
  ["ГУСКА ", "f"],
  ["ПАТКА", "f"],
  ["КАЛАШТУРА", "f"],
  ["ЧАРАПА", "f"],
  ["СМРАДИНА", "f"],
  ["СКОТИНА", "f"],
  ["СВИЊА", "f"],
  ["ГМАЗИНА", "f"],
  ["СЛИНА", "f"],
  ["БУДАЛА", "f"],
  ["ФАШИСТА", "f"],
  ["ЗМИЈА", "f"],
  ["ПУДЛИЦА", "f"],
  ["ЧИВАВА", "f"],
  ["ПЕДЕРЧИНА", "f"],
  ["КОРА ОД БАНАНЕ", "f"],
  ["КРАВЕТИНА", "f"],
  ["ЖАБА", "f"],
  ["КОЗА", "f"],
  ["ОВЦА", "f"],
  ["КРПА", "f"],
  ["ГУЗИЦА", "f"],
  ["КАРАКОНЏУЛА", "f"],
  ["БУБУЉИЦА", "f"],
  
  ["ГОВЕДО", "o"],
  ["ГОВНО", "o"],
  ["ТЕЛЕ", "o"],
  ["МУДО", "o"],
];

seki.adjs = [
  ["Геноцидни", "m"],
  ["Смежурани", "m"],
  ["Вашингтонски", "m"],
  ["злочиначки", "m"],
  ["Подмукли", "m"],
  ["Антихристов", "m"],
  ["Хитлеров", "m"],
  ["Лажљиви", "m"],
  ["хашки", "m"],
  ["бајрамски", "m"],
  ["педерски", "m"],
  ["усташки", "m"],
  ["сатанин", "m"],
  ["покварени", "m"],

  ["корумпирани", "m"],
  ["корумпирана", "f"],
  ["корумпирано", "o"],

  ["совјетски", "m"],
  ["совјетска", "f"],
  ["совјетско", "o"],

  ["кримогени", "m"],
  ["кримогена", "f"],
  ["кримогено", "o"],

  ["пијандурски", "m"],
  ["пијандурска", "f"],
  ["пијандурско", "o"],

  ["цицијашки", "m"],
  ["цицијашка", "f"],
  ["цицијашко", "o"],

  ["превртљиви", "m"],
  ["превртљива", "f"],
  ["превртљиво", "o"],

  ["Геноцидна", "f"],
  ["Смежурана", "f"],
  ["Вашингтонска", "f"],
  ["злочиначка", "f"],
  ["Подмукла", "f"],
  ["Антихристова", "f"],
  ["Хитлерова", "f"],
  ["Лажљива", "f"],
  ["хашка", "f"],
  ["бајрамска", "f"],
  ["педерска", "f"],
  ["усташка", "f"],
  ["сатанина", "f"],
  ["покварена", "f"],

  ["Смежурано", "o"],
  ["Геноцидно", "o"],
  ["Вашингтонско", "o"],
  ["злочиначко", "o"],
  ["Подмукло", "o"],
  ["Антихристово", "o"],
  ["Хитлерово", "o"],
  ["Лажљиво", "o"],
  ["хашко", "o"],
  ["бајрамско", "o"],
  ["педерско", "o"],
  ["усташко", "o"],
  ["сатанио", "o"],
  ["покварено", "o"],
  ["шкотско", "o"],
  
  ["ЉИГАВ", "m"],
  ["СМРДЉИВ", "m"],
  ["УСИРЕНИ", "m"],
  ["УСТАШКИ", "m"],
  ["ИЗДАЈНИЧКИ", "m"],
  ["ПОСРАН", "m"],
  ["ПАОРСКИ", "m"],
  ["РЕТАРДИРАНИ", "m"],
  ["ЗНОЈАВИ", "m"],
  ["ДЛАКАВИ", "m"],
  
  ["ОДРПАНА", "f"],
  ["МАСНА", "f"],
  ["ГАДНА", "f"],
  ["ПЛАЋЕНИЧКА", "f"],
  ["НАДРОГИРАНА", "f"],
  ["СЛУЗАВА", "f"],
  ["ЦИГАНСКА", "f"],
  ["ЋЕЛАВА", "f"],
  ["ИЗБОРАНА", "f"],
  ["ШИПТАРСКА", "f"],

  ["УСРАНО", "o"],
  ["ДЕБЕЛО", "o"],
  ["ПРОДАНО", "o"],
  ["ОГАВНО", "o"],
  ["БУЉАВО", "o"],
  ["БУБУЉИЧАВО", "o"],
];

seki.bonuses = [
  ["ДЕО ПРВИ"],
  ["ДЕО ДРУГИ"],
  ["МАНИФЕСТ"],
  ["МЕМОАРИ"],
  ["КРАТКЕ ПРИЧЕ"],
  ["ЗБИРКА ПЕСАМА"],
  ["ЕЛЕГИЈЕ"],
  ["ДЕО ТРЕЋИ"],
  ["РОМАН"],
  ["ПОЕМА"],
  ["ЗБИРКА АФОРИЗАМА"],
  ["БИОГРАФИЈА"],
  ["ЖИТИЈЕ"],
  ["ДНЕВНИК"],
  ["АПСТРАКТ"],
  ["ЗБОРНИК РАДОВА"],
  ["ДИСЕРТАЦИЈА"],
];

document.init_seki = function() {
  document.getElementById("next").addEventListener("click", function() {
    seki.update(seki.generate());
  });

  if (document.location.search.length > 0) {
    var content = decodeURIComponent(document.location.search.substring(1));
    content = content.replace(/\+/g, " ");
    content = content.replace(/&.*/g, "");
    seki.update(content);
  } else {
    seki.update(seki.generate());
  }
};
