from PIL import Image, ImageDraw, ImageFont
import math

W, H = 3000, 1800
im = Image.new('RGB', (W, H), '#F7FAFF')
d = ImageDraw.Draw(im)
FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
title = ImageFont.truetype(BOLD, 31)
sub = ImageFont.truetype(FONT, 19)
body = ImageFont.truetype(FONT, 21)
small = ImageFont.truetype(BOLD, 17)
foot = ImageFont.truetype(FONT, 17)
navy, blue, orange, red, violet, green = '#203B5B', '#7895C1', '#D78D31', '#D9675D', '#9170D3', '#319766'
cards = [(24, 976), (1024, 1976), (2024, 2976)]

def text_center(lines, cx, cy, font=body, fill=navy, spacing=4):
    if isinstance(lines, str): lines = lines.split('\n')
    boxes = [d.textbbox((0,0), t, font=font) for t in lines]
    heights = [b[3]-b[1] for b in boxes]
    yy = cy-(sum(heights)+spacing*(len(lines)-1))/2
    for t,b,h in zip(lines,boxes,heights):
        d.text((cx-(b[2]-b[0])/2, yy-b[1]),t,font=font,fill=fill)
        yy += h+spacing

def box(cx, cy, lines, kind='action', w=460, h=72):
    palette={'action':('#FFFFFF',blue),'fix':('#FFF8F6',red),'unknown':('#FBF8FF',violet),'success':('#EFFFF7',green)}
    fill, stroke=palette[kind]
    r=(cx-w/2,cy-h/2,cx+w/2,cy+h/2)
    d.rounded_rectangle(r,radius=13,fill=fill,outline=stroke,width=2)
    text_center(lines,cx,cy,body if kind!='success' else ImageFont.truetype(BOLD,21))
    return r

def diamond(cx,cy,label,kind='observed',w=390,h=94):
    stroke=orange if kind=='observed' else violet
    fill='#FFFAF1' if kind=='observed' else '#FBF8FF'
    points=[(cx,cy-h/2),(cx+w/2,cy),(cx,cy+h/2),(cx-w/2,cy)]
    d.polygon(points,fill=fill)
    d.line(points+[points[0]],fill=stroke,width=2,joint='curve')
    text_center(label,cx,cy,body)
    return (cx-w/2,cy-h/2,cx+w/2,cy+h/2)

def oval(cx,cy,label,w=430,h=63,kind='success'):
    stroke=green if kind=='success' else blue
    fill='#EFFFF7' if kind=='success' else '#F4F7FB'
    d.rounded_rectangle((cx-w/2,cy-h/2,cx+w/2,cy+h/2),radius=h/2,fill=fill,outline=stroke,width=2)
    text_center(label,cx,cy,ImageFont.truetype(BOLD,20))

def arrow(points,color=blue,width=2,label=None,labpos=None):
    d.line(points,fill=color,width=width,joint='curve')
    x0,y0=points[-2]; x1,y1=points[-1]
    a=math.atan2(y1-y0,x1-x0); sz=10
    p=[(x1,y1),(x1-sz*math.cos(a-.5),y1-sz*math.sin(a-.5)),(x1-sz*math.cos(a+.5),y1-sz*math.sin(a+.5))]
    d.polygon(p,fill=color)
    if label:
        lx,ly=labpos or ((x0+x1)/2,(y0+y1)/2)
        bb=d.textbbox((0,0),label,font=small)
        tw=bb[2]-bb[0]; th=bb[3]-bb[1]
        d.rounded_rectangle((lx-tw/2-7,ly-th/2-5,lx+tw/2+7,ly+th/2+5),radius=7,fill='#FFFFFF',outline='#E1E9F3')
        text_center(label,lx,ly,small,green if label=='Có' else red)

def down(cx, y0, y1, label=None):
    arrow([(cx,y0),(cx,y1)],label=label,labpos=(cx+39,(y0+y1)/2))

def decision_branch(cx,cy,fixcx,fixline,unknown=False):
    col=violet if unknown else red
    endx=fixcx-140
    arrow([(cx+195,cy),(endx,cy)],color=col,label='Không',labpos=(cx+224,cy-27))

def panel(i,heading,subtitle):
    x0,x1=cards[i]
    d.rounded_rectangle((x0,24,x1,H-28),radius=20,fill='#FFFFFF',outline='#D5E0EF',width=2)
    text_center(heading,(x0+x1)/2,76,title)
    text_center(subtitle,(x0+x1)/2,116,sub,'#5E7794')
    d.line([(x0+52,148),(x1-52,148)],fill='#D5E0EF',width=2)

panel(0,'01 · Chọn lịch','Chi nhánh · dịch vụ · chuyên viên')
panel(1,'02 · Rà soát','Thời gian · thông tin đặt lịch')
panel(2,'03 · Xác thực','Số điện thoại · OTP · kết quả')

# First column
x=366; fx=756
oval(x,205,'Bắt đầu đặt lịch')
box(x,315,'Chọn quốc gia\nvà chi nhánh')
diamond(x,440,'Đã chọn chi nhánh?')
box(fx,440,'Chọn chi nhánh\nđể tiếp tục','fix',w=280,h=74)
box(x,555,'Xem hoặc tìm kiếm dịch vụ')
box(x,665,'Chọn một hoặc nhiều dịch vụ')
diamond(x,790,'Đã chọn dịch vụ?')
box(fx,790,'Chọn ít nhất\nmột dịch vụ','fix',w=280,h=74)
box(x,905,'Cập nhật thời lượng\nvà tổng giá')
box(x,1015,'Chọn chuyên viên\nhoặc Không ưu tiên')
diamond(x,1140,'Đã chọn phương án?')
box(fx,1140,'Chọn một\nphương án','fix',w=280,h=74)
box(x,1265,'Hiển thị ngày và giờ\ncòn trống')
diamond(x,1390,'Có giờ phù hợp?')
box(fx,1390,'Đổi ngày hoặc\nchuyên viên','fix',w=280,h=74)
for a,b in [(237,279),(351,393),(487,519),(591,629),(701,743),(837,869),(941,979),(1051,1093),(1187,1229),(1301,1343)]:down(x,a,b,'Có' if a in (487,837,1187) else None)
for cy in (440,790,1140,1390):decision_branch(x,cy,fx,'')
down(x,1437,1501,'Có')
oval(x,1550,'A · Tiếp ở cột 02',w=360,h=56,kind='next')

# Second column
x=1366; fx=1756
oval(x,205,'A · Từ cột 01',w=360,h=56,kind='next')
box(x,315,'Chọn ngày và giờ bắt đầu')
box(x,430,'Hiển thị giờ kết thúc\ntheo thời lượng dịch vụ')
box(x,550,'Rà soát chi nhánh, dịch vụ,\nchuyên viên, giờ và giá',w=510,h=80)
diamond(x,680,'Thông tin chính xác?')
box(fx,680,'Quay lại bước cần sửa;\nkiểm tra giá và lịch','fix',w=280,h=86)
box(x,805,'Thêm ghi chú nếu cần')
box(x,925,'Xem tiền cọc, số tiền còn lại\nvà thời điểm thanh toán',w=510,h=82)
box(x,1045,'Chọn đặt lịch bằng OTP')
box(x,1165,'Nhập mã quốc gia\nvà số điện thoại','unknown')
diamond(x,1295,'Số điện thoại hợp lệ?','unknown')
box(fx,1295,'Sửa số\nđiện thoại','fix',w=280,h=74)
for a,b in [(233,279),(351,391),(469,510),(590,633),(727,769),(841,884),(966,1009),(1081,1129),(1201,1248)]:down(x,a,b,'Có' if a==727 else None)
decision_branch(x,680,fx,'')
decision_branch(x,1295,fx,'',True)
down(x,1342,1501,'Có')
oval(x,1550,'B · Tiếp ở cột 03',w=360,h=56,kind='next')

# Third column
x=2366; fx=2756
oval(x,205,'B · Từ cột 02',w=360,h=56,kind='next')
box(x,325,'Chọn kênh nhận OTP','unknown')
box(x,455,'Hệ thống gửi mã OTP','unknown')
box(x,585,'Nhập mã OTP','unknown')
diamond(x,725,'OTP hợp lệ và còn hiệu lực?','unknown')
box(fx,725,'Nhập lại hoặc\ngửi lại OTP','fix',w=280,h=74)
box(x,870,'Xác nhận đặt lịch','unknown')
diamond(x,1015,'Đặt lịch thành công?','unknown')
box(fx,1015,'Thông báo lỗi;\nhướng dẫn thử lại','fix',w=280,h=74)
oval(x,1190,'Hiển thị xác nhận đặt lịch',w=500,h=70)
for a,b in [(233,289),(361,419),(491,549),(621,678),(772,834),(906,968),(1062,1155)]:down(x,a,b,'Có' if a in (772,1062) else None)
decision_branch(x,725,fx,'',True)
decision_branch(x,1015,fx,'',True)

# Footnotes in reserved bottom strip of each panel
text_center('Các nhánh “Không” chỉ bước cần sửa.',500,1680,foot,'#637B98')
text_center('Nút A/B nối tiếp luồng sang cột bên phải.',1500,1680,foot,'#637B98')
text_center('Phần OTP và kết quả cần xác minh trên KSA.',2500,1680,foot,'#76549B')

out='/workspace/scratch/65ed2546f432/So_do_booking_3_cot_5x3.png'
im.save(out,optimize=True)
print(out, im.size)
