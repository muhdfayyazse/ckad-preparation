# dumy

https://docs.docker.com/samples/react/
https://github.com/orgs/dockersamples/repositories?page=2&type=all
https://github.com/kimkimani/Dockerize-FullStack-React-using-Docker-Nodejs-and-MySQL

https://mohewedy.medium.com/install-kubernetes-cluster-in-virtual-machines-the-easy-way-337ef0c4e37f
https://medium.com/@aryangodara_19887/qemu-virt-manager-and-libvirt-on-macos-with-apple-silicon-m2-dc677e6b8559
https://medium.com/@d.d.k./kubernetes-cluster-on-ubuntu-22-04-setup-and-examples-f734363f0849



sudo mkdir /media/cdrom
sudo mount -t iso9660 /dev/cdrom /media/cdrom

sudo apt-get update
sudo apt-get install -y build-essential linux-headers-`uname -r`

sudo /media/cdrom/./VBoxLinuxAdditions.run

sudo shutdown -r now

mkdir ~/shared

sudo mount -t vboxsf host-folder ~/shared





-----------------------------------

sudo vi /etc/fstab   
#/swap.img	none	swap	sw	0	0

free -h

sudo swapoff -a

#kubernetes.sh
sudo apt-get update
sudo apt install curl apt-transport-https -y
curl -fsSL  https://packages.cloud.google.com/apt/doc/apt-key.gpg|sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/k8s.gpg
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt update
sudo apt install kubelet=1.28.0-00 kubeadm=1.28.0-00 kubectl=1.28.0-00 -y
sudo apt-mark hold kubelet kubeadm kubectl

kubectl version --output=yaml
kubeadm version --output=yaml



#docker.sh
sudo apt update
sudo apt install -y curl gnupg2 software-properties-common apt-transport-https ca-certificates
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update
sudo apt install -y containerd.io docker-ce docker-ce-cli

sudo mkdir -p /etc/systemd/system/docker.service.d

sudo tee /etc/docker/daemon.json <<EOF
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}
EOF


docker --version


#mirantis.sh
VER=$(curl -s https://api.github.com/repos/Mirantis/cri-dockerd/releases/latest|grep tag_name | cut -d '"' -f 4|sed 's/v//g')
echo $VER

wget https://github.com/Mirantis/cri-dockerd/releases/download/v${VER}/cri-dockerd-${VER}.amd64.tgz
tar xvf cri-dockerd-${VER}.amd64.tgz

sudo mv cri-dockerd/cri-dockerd /usr/local/bin/

wget https://raw.githubusercontent.com/Mirantis/cri-dockerd/master/packaging/systemd/cri-docker.service
wget https://raw.githubusercontent.com/Mirantis/cri-dockerd/master/packaging/systemd/cri-docker.socket
sudo mv cri-docker.socket cri-docker.service /etc/systemd/system/
sudo sed -i -e 's,/usr/bin/cri-dockerd,/usr/local/bin/cri-dockerd,' /etc/systemd/system/cri-docker.service

sudo systemctl daemon-reload
sudo systemctl enable cri-docker.service
sudo systemctl enable --now cri-docker.socket


cri-dockerd --version

systemctl status cri-docker.socket



#prerequisites.sh
sudo tee /etc/modules-load.d/k8s.conf <<EOF
overlay
br_netfilter
EOF

sudo modprobe overlay
sudo modprobe br_netfilter

sudo tee /etc/sysctl.d/kubernetes.conf<<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF

sudo sysctl --system

lsmod | grep br_netfilter

lsmod | grep overlay

sysctl net.bridge.bridge-nf-call-iptables net.bridge.bridge-nf-call-ip6tables net.ipv4.ip_forward




----------------------------------------
sudo kubeadm init \
  --pod-network-cidr=10.244.0.0/16 \
  --cri-socket /run/cri-dockerd.sock  \
  --upload-certs \
  --control-plane-endpoint=kmaster:6443 

mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

kubectl create -f https://docs.projectcalico.org/v3.20/manifests/calico.yaml


sudo kubeadm join kmaster:6443 --token vmcjf2.ahbysol1bk68lata \
    --cri-socket /run/cri-dockerd.sock \
	--discovery-token-ca-cert-hash sha256:4ad717767587903b28c1f49158a49c7d298f96c6502f1b066857dfcb67600c37




