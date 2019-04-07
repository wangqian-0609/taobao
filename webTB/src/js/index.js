define(["mui", "BScroll"], function(mui, BScroll) {
	let dix = 0;
	let page = 1;
	let total = 0;
	let flag = false;
	let pullUp = document.querySelector(".pullUp");
	let div = document.querySelectorAll("#conBox>div");
	let BS = new BScroll("#scroll", {
		probeType: 2,
	});
	let [a, b] = [
		[],
		[]
	];
	function init() {
		mui.init();
		getData(5, 0);
		addEvent();
	}

	function getData(l, s) {
		mui.ajax("/api/getData", {
			data: {
				limit: l,
				skip: s
			},
			success: function(rs) {
				total = rs.totalPage
				//console.log(total)
				render(format(rs.data))
			}
		})
	}

	function render(data) {
		data.forEach((item, index) => {
			div[index].innerHTML += item.map(file => {
				return `<dl>
							<dt><img src="images/${file.img}" style = "height:${file.h}px"alt=""></dt>
							<dd>
								<p>${file.title}</p>
								<p >${file.price}</p>
								<p >${file.pay}</p>
								<p>${file.address}</p>
							</dd>
						</dl>`
			}).join("")
		})
		BS.refresh()
	}

	function addEvent() {
		mui(".nav").on("tap", "span", change);
		BS.on("scroll", function() {
			if (this.y < this.maxScrollY - 40) {
				pullUp.innerHTML = "释放加载"
				flag = true;
			} else {
				pullUp.innerHTML = "上拉加载";
				flag = false;
			}
		})
		BS.on("scrollEnd", function() {
			if (flag) {
				if (page < total) {
					page++;
					pullUp.innerHTML = "释放加载"
					getData(5, page);
				} else {
					pullUp.innerHTML = "没有更多数据了"
				}
			}
		})
	}

	function change() {
		let spans = document.querySelectorAll(".nav>span");
		spans[dix].classList.remove("active");
		this.classList.add("active");
		dix = this.getAttribute("data-id");
		if(this.innerHTML=="销量"){
			[a, b] = [
				[],
				[]
			];
			div.forEach(item=>{
				item.innerHTML = "";
			})
			mui.ajax("/api/getSort",{
				success:function (rs){
					getData(rs.data)
				}
			})	
		}
		
	}
	
	function format(data) {
		data.forEach(item => {
			// console.log(item)
			if (!a.length) {
				a.push(item)
				return
			} else if (!b.length) {
				b.push(item)
				return
			}
			if (a.reduce((cur, next) => cur + next.h, 0) < b.reduce((cur, next) => cur + next.h, 0)) {
				a.push(item)
			} else {
				b.push(item)
			}
		})
		return [a, b]
	}
	init()
})
